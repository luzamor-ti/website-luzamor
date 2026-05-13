import { groq } from "next-sanity";

export const globalConfigQuery = groq`
  *[_type == "configuracaoGlobal"][0] {
    "whatsappGlobal": contato.whatsapp
  }
`;

export const coursesQuery = groq`
  *[_type == "curso" && ativo == true] | order(ordem asc, _createdAt desc) {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverPhoto": {
      "asset": fotoCapa.asset,
      "alt": fotoCapa.alt
    },
    "price": valor,
    "description": descricao,
    "shortDescription": descricaoCurta,
    "schedule": datasHorarios,
    "teachers": professores[]{
      "type": tipo,
      "memberData": tipo == "membro" -> professorMembro->{
        _id,
        "name": nome,
        "role": cargo,
        "photo": {
          "asset": foto.asset,
          "alt": alt
        },
        "shortBio": bioCurta
      },
      "externalData": tipo == "externo" -> {
        "name": nome,
        "photo": {
          "asset": foto.asset,
          "alt": foto.alt
        }
      }
    },
    "minAge": idadeMinima,
    "pricing": precos[]{
      "tier": tier,
      "value": value,
      "description": description
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "classroom": salaAula->{ "slug": slug.current, "name": nome },
    "active": ativo,
    "order": ordem,
    "teacherType": tipoProfessor,
    "teacherMember": professorMembro->{
      _id,
      "name": nome,
      "role": cargo,
      "photo": {
        "asset": foto.asset,
        "alt": alt
      }
    },
    "externalTeacher": professorExterno {
      "name": nome,
      "photo": {
        "asset": foto.asset,
        "alt": foto.alt
      }
    }
  }
`;

export const courseBySlugQuery = groq`
  *[_type == "curso" && slug.current == $slug && ativo == true][0] {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverPhoto": {
      "asset": fotoCapa.asset,
      "alt": fotoCapa.alt
    },
    "price": valor,
    "description": descricao,
    "shortDescription": descricaoCurta,
    "schedule": datasHorarios,
    "teachers": professores[]{
      "type": tipo,
      "memberData": tipo == "membro" -> professorMembro->{
        _id,
        "name": nome,
        "role": cargo,
        "photo": {
          "asset": foto.asset,
          "alt": alt
        },
        "shortBio": bioCurta
      },
      "externalData": tipo == "externo" -> {
        "name": nome,
        "photo": {
          "asset": foto.asset,
          "alt": foto.alt
        }
      }
    },
    "minAge": idadeMinima,
    "pricing": precos[]{
      "tier": tier,
      "value": value,
      "description": description
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "classroom": salaAula->{ "slug": slug.current, "name": nome },
    "active": ativo,
    "teacherType": tipoProfessor,
    "teacherMember": professorMembro->{
      _id,
      "name": nome,
      "role": cargo,
      "photo": {
        "asset": foto.asset,
        "alt": alt
      },
      "shortBio": bioCurta
    },
    "externalTeacher": professorExterno {
      "name": nome,
      "photo": {
        "asset": foto.asset,
        "alt": foto.alt
      }
    }
  }
`;

export const relatedcoursesQuery = groq`
  *[_type == "curso" && ativo == true] | order(ordem asc, _createdAt desc) {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverPhoto": {
      "asset": fotoCapa.asset,
      "alt": fotoCapa.alt
    },
    "price": valor,
    "description": descricao,
    "shortDescription": descricaoCurta,
    "schedule": datasHorarios,
    "teachers": professores[]{
      "type": tipo,
      "memberData": tipo == "membro" -> professorMembro->{
        _id,
        "name": nome,
        "role": cargo,
        "photo": {
          "asset": foto.asset,
          "alt": alt
        },
        "shortBio": bioCurta
      },
      "externalData": tipo == "externo" -> {
        "name": nome,
        "photo": {
          "asset": foto.asset,
          "alt": foto.alt
        }
      }
    },
    "minAge": idadeMinima,
    "pricing": precos[]{
      "tier": tier,
      "value": value,
      "description": description
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "classroom": salaAula->{ "slug": slug.current, "name": nome },
    "active": ativo,
    "order": ordem,
    "teacherType": tipoProfessor,
    "teacherMember": professorMembro->{
      _id,
      "name": nome,
      "role": cargo,
      "photo": {
        "asset": foto.asset,
        "alt": alt
      }
    },
    "externalTeacher": professorExterno {
      "name": nome,
      "photo": {
        "asset": foto.asset,
        "alt": foto.alt
      }
    }
  }
`;
