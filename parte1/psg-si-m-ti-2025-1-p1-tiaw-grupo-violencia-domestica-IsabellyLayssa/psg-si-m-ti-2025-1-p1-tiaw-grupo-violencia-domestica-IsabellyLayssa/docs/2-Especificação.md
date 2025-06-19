# Especificações Do Projeto

<span style="color:red">Pré-requisitos: <a href="1-Contexto.md"> Documentação de Contexto</a></span>

> Apresente uma visão geral do que será abordado nesta parte do
> documento, enumerando as técnicas e/ou ferramentas utilizadas para
> realizar a especificações do projeto

## Personas

Persona 1: Giovanna Mendes, 38 anos. Possível denunciante, é psicóloga e trabalha no RH de uma empresa de advocacia. Sua amiga passa por casos de violência doméstica em casa com o marido e ela usaria o site para denunciá-lo.

Persona 2: Rosangela Maria, 49 anos. Possível denunciante, é empregada doméstica e presencia casos de violência domésticas sofridos pela sua patroa. Usaria o site para denunciar seu patrão. 

Persona 3: Alex, 17 anos. É estudante e trabalha como jovem aprendiz. Presencia cenas de agressão provenientes de seu pai contra sua mãe. Usaria o site para denunciar a violência doméstica dentro de sua casa. 

Persona 4: Maria Silva, 40 anos. É vendedora de bolos e é uma pessoa de classe baixa. Sofre violência doméstica e usaria o site para denunciar o seu agressor. 

Persona 5: Cléia Márcia, 63 anos. É aposentada, e escuta as agressões no seu prédio e em prédio vizinhos. Usaria o site para denunciar anonimamente a violência doméstica ao seu redor em outros apartamentos. 

Persona 6: Louise Leblanc, 35 anos. Não trabalha, vive com a renda de seu marido. Sofre violência doméstica de seu cônjuge, mas possui dependência financeira dele. Usaria o site para denunciá-lo.

> Enumere e detalhe as personas da sua solução. Para
> tanto, baseie-se tanto nos documentos disponibilizados na disciplina
> e/ou nos seguintes links:
>
> **Links Úteis**:
> - [Rock Content](https://rockcontent.com/blog/personas/)
> - [Hotmart](https://blog.hotmart.com/pt-br/como-criar-persona-negocio/)
> - [O que é persona?](https://resultadosdigitais.com.br/blog/persona-o-que-e/)
> - [Persona x Público-alvo](https://flammo.com.br/blog/persona-e-publico-alvo-qual-a-diferenca/)
> - [Mapa de Empatia](https://resultadosdigitais.com.br/blog/mapa-da-empatia/)
> - [Mapa de Stalkeholders](https://www.racecomunicacao.com.br/blog/como-fazer-o-mapeamento-de-stakeholders/)
>
> Lembre-se que você deve ser enumerar e descrever precisamente e
> personalizada todos os clientes ideais que sua solução almeja.

## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Usuário do sistema  | acessar um aplicativo seguro e discreto para denunciar agressões e buscar ajuda. | garantir minha segurança, receber suporte imediato e encontrar meios para sair dessa situação sem que meu agressor perceba. |

|Usuário manutenção  | garantir que a plataforma seja segura, estável e discreta. | criar um ambiente onde qualquer pessoa consiga pedir ajuda com um sistema de ótima qualidade. |

|Denunciante terceiro | poder ter acesso a uma plataforma que me permita auxiliar a vítima de maneira remota e eficaz. | a vítima possa receber as medidas e cuidados necessários diante do estado de vulnerabilidade encontrado. |

|Usuário colaborador de ONGs | ter acesso a dados das vítimas como nome e endereço. | entrar em contato com elas e prestar apoio e ajuda psicológica e emocional. |

|Usuário administrador | um painel de gerenciamento. | organizar e acompanhar as denúncias, para garantir que cada caso seja encaminhado corretamente e tratado com segurança. |

|Usuário profissional | quero um espaço seguro para me comunicar com as vítimas. | proporcionar a elas um apoio psicológico para que possam superar os traumas e experiências vividas. |

|Usuário que encaminha e-mail | quero ter acesso às informações da denúncia e do denunciante e/ou vítima. | encaminhar e-mails com as informações da denúncia para a Polícia. |

> Apresente aqui as histórias de usuário que são relevantes para o
> projeto de sua solução. As Histórias de Usuário consistem em uma
> ferramenta poderosa para a compreensão e elicitação dos requisitos
> funcionais e não funcionais da sua aplicação. Se possível, agrupe as
> histórias de usuário por contexto, para facilitar consultas
> recorrentes à essa parte do documento.
>
> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Página de login fácil: cadastro com e-mail/ nome de usuário, senha e opção de lembrar do login | ALTA | 

|RF-002| Upload de provas: o sistema deve permitir envio de imagens, vídeos e áudios como prova da denúncia   | MÉDIA |

|RF-003| Acompanhamento das denúncias: o sistema deve mostrar ao usuário se a denúncia foi enviada corretamente aos órgãos competentes; | ALTA | 

|RF-004| Chat de apoio: o sistema deve conter um chat de apoio com profissionais capacitados para oferecer apoio especializado às vítimas | ALTA |

|RF-005| Posts de como identificar violência doméstica: o site deve conter um informativo para as pessoas saberem o que é violência doméstica e como denunciar | BAIXA |


### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Adequação de produtos digitais à LGPD | BAIXA |

|RNF-002| Uma solução precisa utilizar criptografia, pois manipula dados sensíveis | MÉDIA |

|RNF-003| Segurança: O sistema deve proteger contra acessos não autorizados, ataques e perda de dados | ALTA |

|RNF-004| Tempo de resposta: O sistema deve responder rapidamente às solicitações do usuário | MÉDIA |

|RNF-005| O sistema deverá estar disponível 7/24 (7 dias por semana 24 horas por dia) | MÉDIA |

|RNF-006|  O processo de desenvolvimento deve utilizar html e css | BAIXA |

|RNF-007| O site deve ser publicado em um ambiente acessível publicamente na Internet (Repl.it, GitHub Pages, Heroku) | MÉDIA |

|RNF-007| O site deverá ser responsivo permitindo a visualização em um celular de forma adequada. | BAIXA |

> Com base nas Histórias de Usuário, enumere os requisitos da sua
> solução. Classifique esses requisitos em dois grupos:
>
> - [Requisitos Funcionais
>   (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
>   correspondem a uma funcionalidade que deve estar presente na
>   plataforma (ex: cadastro de usuário).
>
> - [Requisitos Não Funcionais
>   (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
>   correspondem a uma característica técnica, seja de usabilidade,
>   desempenho, confiabilidade, segurança ou outro (ex: suporte a
>   dispositivos iOS e Android).
>
> Lembre-se que cada requisito deve corresponder à uma e somente uma
> característica alvo da sua solução. Além disso, certifique-se de que
> todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

       |


> 
> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
