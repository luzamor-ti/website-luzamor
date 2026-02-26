import { groq } from "next-sanity";

export const coursesQuery = groq`
  *[_type == "curso" && ativo == true] | order(ordem asc, _createdAt desc) {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverPhoto": {
      "asset": fotoCapa.asset,
      "alt": fotoCapa.alt
    },
    "description": descricao,
    "schedule": datasHorarios,
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
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "active": ativo,
    "order": ordem
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
    "description": descricao,
    "schedule": datasHorarios,
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
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "active": ativo
  }
`;
