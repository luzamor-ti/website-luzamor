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
    "minAge": idadeMinima,
    "monthlyOptions": opcoesMensalidade[] {
      "title": titulo,
      "free": gratuito,
      "price": valor,
      "details": detalhes
    },
    "description": descricao,
    "shortDescription": descricaoCurta,
    "schedule": datasHorarios,
    "requireScheduling": agendamentoNecessario,
    "teachers": professores[] {
      "teacherType": tipoProfessor,
      "teacherMember": professorMembro->{
        _id,
        "name": nome,
        "role": cargo,
        "photo": {
          "asset": foto.asset,
          "alt": alt
        },
        "shortBio": bioCurta,
        "fullBio": bioCompleta
      },
      "externalTeacher": professorExterno {
        "name": nome,
        "photo": {
          "asset": foto.asset,
          "alt": foto.alt
        }
      }
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "classroom": salaAula->{ "slug": slug.current, "name": nome },
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
    "minAge": idadeMinima,
    "monthlyOptions": opcoesMensalidade[] {
      "title": titulo,
      "free": gratuito,
      "price": valor,
      "details": detalhes
    },
    "description": descricao,
    "shortDescription": descricaoCurta,
    "schedule": datasHorarios,
    "requireScheduling": agendamentoNecessario,
    "teachers": professores[] {
      "teacherType": tipoProfessor,
      "teacherMember": professorMembro->{
        _id,
        "name": nome,
        "role": cargo,
        "photo": {
          "asset": foto.asset,
          "alt": alt
        },
        "shortBio": bioCurta,
        "fullBio": bioCompleta
      },
      "externalTeacher": professorExterno {
        "name": nome,
        "photo": {
          "asset": foto.asset,
          "alt": foto.alt
        }
      }
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "classroom": salaAula->{ "slug": slug.current, "name": nome },
    "active": ativo
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
    "minAge": idadeMinima,
    "monthlyOptions": opcoesMensalidade[] {
      "title": titulo,
      "free": gratuito,
      "price": valor,
      "details": detalhes
    },
    "description": descricao,
    "shortDescription": descricaoCurta,
    "schedule": datasHorarios,
    "requireScheduling": agendamentoNecessario,
    "teachers": professores[] {
      "teacherType": tipoProfessor,
      "teacherMember": professorMembro->{
        _id,
        "name": nome,
        "role": cargo,
        "photo": {
          "asset": foto.asset,
          "alt": alt
        },
        "shortBio": bioCurta,
        "fullBio": bioCompleta
      },
      "externalTeacher": professorExterno {
        "name": nome,
        "photo": {
          "asset": foto.asset,
          "alt": foto.alt
        }
      }
    },
    "enrollment": inscricao {
      "active": ativa,
      "messageText": textoMensagem,
      "whatsapp": whatsapp,
      "buttonText": textoBotao
    },
    "classroom": salaAula->{ "slug": slug.current, "name": nome },
    "active": ativo,
    "order": ordem
  }
`;
