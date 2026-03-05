import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton — Página de Parceiros (apenas um documento, com ID fixo)
      S.listItem()
        .title('Página de Parceiros')
        .id('paginaParceiros')
        .child(
          S.document()
            .schemaType('paginaParceiros')
            .documentId('paginaParceiros')
        ),
      // Demais tipos de documento
      ...S.documentTypeListItems().filter(
        (listItem) => listItem.getId() !== 'paginaParceiros'
      ),
    ])
