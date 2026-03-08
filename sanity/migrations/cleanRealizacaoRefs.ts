/**
 * Migration Script: Clean realizacao and incentivadoPor references
 *
 * This script fixes invalid reference fields that contain inline data
 * (like imagem, titulo) instead of pure references (_ref, _type only).
 *
 * Run with: npx sanity exec sanity/migrations/cleanRealizacaoRefs.ts --with-user-token
 */

import { getCliClient } from "sanity/cli";

const client = getCliClient();

interface InvalidRef {
  _ref?: string;
  _type?: string;
  imagem?: unknown;
  titulo?: string;
  [key: string]: unknown;
}

interface ProjectDocument {
  _id: string;
  _type: string;
  realizacao?: InvalidRef;
  incentivadoPor?: InvalidRef;
}

async function cleanReferences() {
  console.log("🔍 Searching for projects with invalid references...\n");

  // Find all projects that have realizacao or incentivadoPor with extra fields
  const query = `*[_type == "projeto" && (
    defined(realizacao.imagem) || 
    defined(realizacao.titulo) ||
    defined(incentivadoPor.imagem) ||
    defined(incentivadoPor.titulo)
  )] {
    _id,
    _type,
    realizacao,
    incentivadoPor
  }`;

  const projects: ProjectDocument[] = await client.fetch(query);

  if (projects.length === 0) {
    console.log("✅ No projects with invalid references found.");
    return;
  }

  console.log(
    `📋 Found ${projects.length} project(s) with invalid references:\n`,
  );

  for (const project of projects) {
    console.log(`  - ${project._id}`);
  }

  console.log("\n🔧 Starting cleanup...\n");

  let successCount = 0;
  let errorCount = 0;

  for (const project of projects) {
    const patches: Record<string, { _ref: string; _type: string } | undefined> =
      {};

    // Clean realizacao if it has invalid fields
    if (
      project.realizacao &&
      (project.realizacao.imagem || project.realizacao.titulo)
    ) {
      if (project.realizacao._ref) {
        patches.realizacao = {
          _ref: project.realizacao._ref,
          _type: "reference",
        };
        console.log(
          `  📝 ${project._id}: Cleaning realizacao (keeping ref: ${project.realizacao._ref})`,
        );
      } else {
        patches.realizacao = undefined; // Will unset if no valid _ref
        console.log(
          `  ⚠️  ${project._id}: No valid _ref in realizacao, will remove field`,
        );
      }
    }

    // Clean incentivadoPor if it has invalid fields
    if (
      project.incentivadoPor &&
      (project.incentivadoPor.imagem || project.incentivadoPor.titulo)
    ) {
      if (project.incentivadoPor._ref) {
        patches.incentivadoPor = {
          _ref: project.incentivadoPor._ref,
          _type: "reference",
        };
        console.log(
          `  📝 ${project._id}: Cleaning incentivadoPor (keeping ref: ${project.incentivadoPor._ref})`,
        );
      } else {
        patches.incentivadoPor = undefined;
        console.log(
          `  ⚠️  ${project._id}: No valid _ref in incentivadoPor, will remove field`,
        );
      }
    }

    try {
      const transaction = client.transaction().patch(project._id, (patch) => {
        let p = patch;

        for (const [field, value] of Object.entries(patches)) {
          if (value === undefined) {
            p = p.unset([field]);
          } else {
            p = p.set({ [field]: value });
          }
        }

        return p;
      });

      await transaction.commit();
      successCount++;
      console.log(`  ✅ ${project._id}: Fixed successfully`);
    } catch (error) {
      errorCount++;
      console.error(`  ❌ ${project._id}: Failed to fix -`, error);
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`\n🎉 Migration complete!`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
}

cleanReferences().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
