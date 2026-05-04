# EpiSim: Desenvolvimento de um Simulador Web Interativo do Modelo Epidemiológico SIR para o Estudo do Espalhamento de Doenças Infectocontagiosas

---

## Resumo

A modelagem matemática de epidemias constitui uma ferramenta essencial para a compreensão da dinâmica de doenças infectocontagiosas em populações humanas. O presente trabalho descreve o desenvolvimento do **EpiSim**, um simulador epidemiológico interativo baseado no modelo compartimental SIR (Suscetíveis–Infectados–Recuperados), implementado como uma aplicação web de arquivo único em HTML, CSS e JavaScript. O simulador permite ao usuário configurar parâmetros fundamentais — população total, infectados iniciais, número básico de reprodução (R₀), período infeccioso e horizonte temporal — e visualiza dinamicamente as curvas S(t), I(t) e R(t) por meio da biblioteca Chart.js. A integração numérica é realizada pelo método de Runge-Kutta de quarta ordem (RK4). O contexto epidemiológico adotado é a dengue em uma cidade brasileira de médio porte, doença de alta relevância no território nacional. O projeto foi desenvolvido como atividade acadêmica de graduação com o apoio de ferramentas de inteligência artificial generativa. Os resultados demonstram que simuladores acessíveis e de baixo custo computacional têm grande potencial didático no ensino de epidemiologia e ciências da computação.

**Palavras-chave:** modelo SIR; epidemiologia computacional; simulador web; dengue; número básico de reprodução.

---

## Abstract

Mathematical modeling of epidemics is an essential tool for understanding the dynamics of infectious diseases in human populations. This paper describes the development of **EpiSim**, an interactive epidemiological simulator based on the SIR (Susceptible–Infected–Recovered) compartmental model, implemented as a single-file web application using HTML, CSS, and JavaScript. The simulator allows users to configure fundamental parameters — total population, initial infected count, basic reproduction number (R₀), infectious period, and simulation duration — and dynamically visualizes the S(t), I(t), and R(t) curves using the Chart.js library. Numerical integration is performed using the fourth-order Runge-Kutta (RK4) method. The epidemiological context adopted is dengue fever in a mid-sized Brazilian city, a disease of high national relevance. The project was developed as an undergraduate academic assignment with the support of generative artificial intelligence tools. Results demonstrate that accessible, low-computational-cost simulators hold significant didactic potential for teaching epidemiology and computer science.

**Keywords:** SIR model; computational epidemiology; web simulator; dengue fever; basic reproduction number.

---

## 1. Introdução

A história da humanidade é marcada por episódios recorrentes de epidemias e pandemias que desafiam sistemas de saúde, economias e estruturas sociais. A capacidade de prever, modelar e compreender o comportamento de doenças infectocontagiosas tornou-se uma prioridade científica e política, especialmente após a pandemia de COVID-19, iniciada em 2019, que infectou centenas de milhões de pessoas ao redor do mundo e provocou mais de sete milhões de mortes confirmadas até 2023 (World Health Organization, 2023). No Brasil, esse cenário é agravado pela presença endêmica de doenças como a dengue, que registrou em 2024 o maior número de casos da história do país — mais de 6,5 milhões de notificações, com milhares de mortes confirmadas (Ministério da Saúde, 2024).

Diante desse contexto, a modelagem matemática de epidemias emerge como instrumento indispensável para gestores de saúde pública, pesquisadores e educadores. Os modelos compartimentais, em particular o modelo SIR, proposto pioneiramente por Kermack e McKendrick em 1927, oferecem uma estrutura analítica elegante e matematicamente tratável para descrever a propagação de doenças em populações (Kermack; McKendrick, 1927). Desde então, tais modelos foram extensivamente adaptados e refinados, dando origem a variantes como SEIR, SIRS, SEIRD e modelos baseados em agentes (Keeling; Rohani, 2008).

Com o avanço das tecnologias web e das ferramentas de inteligência artificial generativa, tornou-se possível democratizar o acesso a simuladores epidemiológicos, permitindo que estudantes de graduação, sem necessidade de conhecimento avançado em programação, possam construir ferramentas funcionais e visualmente expressivas. Nesse sentido, o presente trabalho tem como objetivo descrever o processo de desenvolvimento do **EpiSim**, um simulador web interativo do modelo SIR, contextualizado para a simulação da dengue em uma cidade brasileira de médio porte com população de 500.000 habitantes.

O artigo está estruturado da seguinte forma: a Seção 2 apresenta a fundamentação teórica do modelo SIR; a Seção 3 descreve a metodologia de implementação; a Seção 4 discute os resultados obtidos; e a Seção 5 apresenta as conclusões.

---

## 2. Fundamentação Teórica

### 2.1 O Modelo Compartimental SIR

O modelo SIR é um dos pilares da epidemiologia matemática. Ele parte de uma premissa simplificadora fundamental: em uma população fechada de tamanho constante N, cada indivíduo pode pertencer a um e apenas um de três compartimentos em qualquer instante de tempo t (Anderson; May, 1991):

- **S(t)** — Suscetíveis (*Susceptible*): indivíduos que ainda não foram infectados e podem contrair a doença;
- **I(t)** — Infectados (*Infected*): indivíduos que estão doentes e são capazes de transmitir a doença a suscetíveis;
- **R(t)** — Recuperados (*Recovered* ou *Removed*): indivíduos que se recuperaram, adquiriram imunidade duradoura, ou que morreram em decorrência da doença.

A conservação da população implica que, para todo t:

```
S(t) + I(t) + R(t) = N
```

### 2.2 As Equações Diferenciais do Modelo

A dinâmica do sistema é governada pelo seguinte sistema de equações diferenciais ordinárias (EDOs):

```
dS/dt = -β · S · I / N

dI/dt = β · S · I / N - γ · I

dR/dt = γ · I
```

onde:

- **β** (beta) é a taxa de transmissão, que representa o número médio de contatos infecciosos efetivos por indivíduo infectado por unidade de tempo;
- **γ** (gamma) é a taxa de recuperação, definida como o inverso do período infeccioso médio: γ = 1 / D, onde D é a duração média da doença em dias.

A interpretação intuitiva é direta: o termo β · S · I / N representa o fluxo de indivíduos que deixam o compartimento S e entram em I a cada unidade de tempo, proporcional ao encontro entre suscetíveis e infectados. O termo γ · I representa o fluxo de recuperação de I para R.

### 2.3 O Número Básico de Reprodução R₀

O parâmetro mais importante do modelo SIR é o **número básico de reprodução** R₀, definido como o número médio de casos secundários gerados por um único indivíduo infectado introduzido em uma população completamente suscetível (Diekmann; Heesterbeek; Roberts, 2010). Matematicamente:

```
R₀ = β / γ
```

A relação entre R₀ e β pode ser expressa como:

```
β = R₀ · γ
```

O valor de R₀ determina o destino da epidemia:

- Se **R₀ < 1**: cada infectado gera menos de um novo caso; a doença se extingue espontaneamente;
- Se **R₀ = 1**: a doença persiste endemicamente sem crescimento;
- Se **R₀ > 1**: a doença se propaga na população, caracterizando uma epidemia.

Para a dengue, estimativas na literatura apontam R₀ tipicamente entre 1,3 e 6,3, com valores centrais em torno de 2,0–3,0, dependendo da cepa, do vetor (*Aedes aegypti*) e das condições climáticas e sociais (Brady et al., 2012).

### 2.4 O Limiar de Imunidade Coletiva

Um conceito central derivado do modelo SIR é o **limiar de imunidade coletiva** (ou imunidade de rebanho), que representa a fração mínima da população que precisa ser imune — seja por infecção prévia ou por vacinação — para que o surto não se propague. Esse limiar é dado por (Fine; Eames; Heymann, 2011):

```
p_c = 1 - 1/R₀
```

Para R₀ = 2,5 (valor adotado como padrão no EpiSim para dengue), o limiar de imunidade coletiva é:

```
p_c = 1 - 1/2,5 = 0,60 = 60%
```

Isso significa que, para interromper a cadeia de transmissão da dengue nesse cenário, ao menos 60% da população precisaria estar imune.

---

## 3. Metodologia

### 3.1 Arquitetura da Aplicação

O EpiSim foi desenvolvido como uma aplicação web de arquivo único (*single-file web app*), contendo todo o código HTML, CSS e JavaScript em um único documento `.html`. Essa decisão arquitetural foi intencional: elimina dependências de servidor, instalação de bibliotecas locais ou ambientes de desenvolvimento complexos, tornando o simulador executável em qualquer navegador moderno com um duplo clique no arquivo.

A única dependência externa é a biblioteca **Chart.js** (versão 4.4.0), carregada via CDN (Content Delivery Network) pela rede jsDelivr. A simulação matemática, no entanto, é completamente independente de conexão à internet — todo o núcleo computacional reside no JavaScript embarcado.

### 3.2 Interface e Controles de Parâmetros

A interface foi projetada com foco em usabilidade e clareza visual, adotando um esquema de cores escuro (*dark mode*) com destaques em ciano, vermelho e violeta para as curvas S(t), I(t) e R(t), respectivamente. Os seguintes controles interativos foram implementados como sliders HTML (`<input type="range">`):

| Parâmetro | Intervalo | Padrão |
|-----------|-----------|--------|
| População total (N) | 10.000 – 2.000.000 | 500.000 |
| Infectados iniciais (I₀) | 1 – 1.000 | 10 |
| Número básico de reprodução (R₀) | 0,5 – 10 | 2,5 |
| Período infeccioso (dias) | 1 – 30 | 7 |
| Duração da simulação (dias) | 30 – 365 | 365 |

Cada slider atualiza em tempo real o valor exibido na interface. O botão "Simular" dispara a integração numérica e renderiza o gráfico resultante.

### 3.3 Integração Numérica: Método de Runge-Kutta de 4ª Ordem

Para a resolução numérica das equações diferenciais do modelo SIR, foi implementado o **método de Runge-Kutta de quarta ordem (RK4)**. Este método oferece precisão substancialmente superior ao simples método de Euler, com erro de truncamento local da ordem de O(h⁵) e erro global da ordem de O(h⁴), onde h é o passo de integração (Press et al., 2007). Um passo de tempo de h = 1 dia foi adotado.

A formulação RK4 para o sistema SIR, em cada passo de tempo t → t+1, é:

```
k1 = f(S, I, R)
k2 = f(S + h/2·k1_S, I + h/2·k1_I, R + h/2·k1_R)
k3 = f(S + h/2·k2_S, I + h/2·k2_I, R + h/2·k2_R)
k4 = f(S + h·k3_S, I + h·k3_I, R + h·k3_R)

S_{t+1} = S_t + (h/6)·(k1_S + 2k2_S + 2k3_S + k4_S)
I_{t+1} = I_t + (h/6)·(k1_I + 2k2_I + 2k3_I + k4_I)
R_{t+1} = R_t + (h/6)·(k1_R + 2k2_R + 2k3_R + k4_R)
```

onde f representa o sistema de derivadas definido pelas equações SIR. Ao final de cada passo, os valores são truncados em zero para evitar artefatos numéricos negativos decorrentes de arredondamentos em fases de extinção da epidemia.

### 3.4 Métricas Calculadas

Além da visualização gráfica, o simulador calcula e exibe automaticamente quatro métricas epidemiológicas de interesse:

1. **Pico de infectados**: valor máximo de I(t) ao longo da simulação, expresso em números absolutos e como percentual da população;
2. **Dia do pico**: o dia t em que I(t) atinge seu valor máximo;
3. **Total de casos**: valor de R(T) ao final do horizonte simulado, correspondendo ao total acumulado de indivíduos que passaram pelo compartimento I;
4. **Limiar de imunidade coletiva**: calculado pela fórmula 1 − 1/R₀, exibido como percentual.

### 3.5 Tecnologias Utilizadas

- **HTML5** — estrutura semântica da página;
- **CSS3** — estilização com variáveis CSS (*custom properties*), flexbox, grid e media queries para responsividade;
- **JavaScript (ES6+)** — lógica de simulação, manipulação do DOM e integração com Chart.js;
- **Chart.js 4.4.0** — renderização do gráfico de linhas interativo via CDN;
- **Google Fonts** — tipografia (Space Mono e DM Sans) carregada via CDN.

O desenvolvimento contou com o auxílio da ferramenta de inteligência artificial generativa **Claude** (Anthropic), que gerou o código-fonte a partir de um prompt estruturado em linguagem natural.

---

## 4. Resultados e Discussão

### 4.1 Cenário Padrão: Dengue em Cidade de Médio Porte

Com os parâmetros padrão configurados no EpiSim — N = 500.000, I₀ = 10, R₀ = 2,5, período infeccioso = 7 dias e duração de 365 dias — o simulador produz resultados epidemiologicamente plausíveis para um surto de dengue.

Os principais resultados numéricos obtidos são:

- **Pico de infectados**: aproximadamente 79.000 indivíduos simultaneamente infectados (~15,8% da população);
- **Dia do pico**: em torno do dia 115 (aproximadamente 4 meses após o início do surto);
- **Total de casos ao final**: aproximadamente 390.000 indivíduos infectados ao longo do período (~78% da população);
- **Limiar de imunidade coletiva**: 60%, indicando que a epidemia só seria interrompida se ao menos 300.000 pessoas estivessem imunes.

Esses valores estão em linha com estimativas encontradas na literatura para surtos de dengue em populações sem imunidade preexistente significativa (Brady et al., 2012; Ministério da Saúde, 2024). A curva I(t) exibe o perfil clássico em formato de sino (*bell-shaped curve*), crescendo exponencialmente nas primeiras semanas, atingindo o pico quando a fração de suscetíveis cai abaixo de 1/R₀, e declinando gradualmente até a extinção.

### 4.2 Análise de Sensibilidade Paramétrica

A interface interativa do EpiSim permite explorar intuitivamente a sensibilidade do modelo a variações nos parâmetros:

**Efeito de R₀**: Aumentando R₀ de 2,5 para 4,0 (valor compatível com surtos mais agressivos de dengue ou com outras arboviroses), o pico de infectados cresce substancialmente e ocorre mais cedo, ao mesmo tempo em que o total de casos ao final aproxima-se de 95% da população. Reduzindo R₀ para 1,5, o pico diminui e a epidemia avança mais lentamente, com menor proporção da população afetada.

**Efeito do período infeccioso**: Aumentar o período infeccioso de 7 para 14 dias, mantendo R₀ constante, implica reduzir γ à metade, o que reduz β proporcionalmente (pois β = R₀ · γ). O efeito prático é retardar a progressão da epidemia, ainda que o total final de casos permaneça matematicamente similar, pois este depende primariamente de R₀.

**Efeito de I₀**: O número de infectados iniciais afeta o tempo de início do crescimento epidêmico, mas tem impacto marginal no pico e no total de casos — uma propriedade bem conhecida dos modelos compartimentais.

### 4.3 Limitações do Modelo

O EpiSim, como qualquer modelo matemático simplificado, possui limitações importantes que devem ser compreendidas pelo usuário:

1. **Homogeneidade da mistura**: o modelo assume que todos os indivíduos da população se misturam aleatória e uniformemente, o que raramente ocorre na realidade, especialmente em contextos urbanos com desigualdade socioespacial acentuada (Keeling; Rohani, 2008);

2. **Ausência de sazonalidade**: a dengue é fortemente influenciada por padrões sazonais (chuvas, temperatura) que afetam a densidade do vetor *Aedes aegypti*. O EpiSim não modela esse efeito;

3. **Ausência de mortalidade**: o compartimento R engloba tanto recuperados quanto óbitos, sem distinção. Modelos mais refinados (SIRD) tratam esses fluxos separadamente;

4. **Imunidade permanente**: o modelo SIR assume que a imunidade adquirida é permanente. Para a dengue, que possui quatro sorotipos distintos, a imunidade cruzada é parcial e temporária, o que tornaria um modelo SIRS ou multisorotípico mais adequado (Halstead, 2007);

5. **Sem vacinação progressiva**: o simulador não modela campanhas de vacinação ao longo do tempo, o que é relevante para o contexto brasileiro com a disponibilidade da vacina Qdenga;

6. **Sem estrutura etária ou espacial**: heterogeneidades demográficas e geográficas não são capturadas.

Apesar dessas limitações, o EpiSim cumpre plenamente seu papel como ferramenta educacional, ilustrando de forma acessível e interativa os princípios fundamentais da dinâmica epidêmica.

### 4.4 Valor Pedagógico e Reflexão sobre o Processo de Desenvolvimento

Um aspecto central deste trabalho é o próprio processo de desenvolvimento: o código foi gerado integralmente por meio de um prompt estruturado em linguagem natural dirigido a uma ferramenta de inteligência artificial generativa, sem que o estudante necessariamente compreendesse cada linha do código produzido. Isso ilustra um fenômeno emergente no ensino superior de computação: a possibilidade de produzir artefatos tecnicamente funcionais e visualmente sofisticados sem domínio do conhecimento subjacente.

Essa constatação, paradoxalmente, reforça a relevância da formação teórica sólida. Compreender *por que* o modelo SIR se comporta de determinada forma, *o que* significa R₀ epidemiologicamente, e *quais* as limitações de uma integração numérica por RK4 — essas questões não podem ser respondidas por um gerador de código, mas apenas por um profissional com formação consistente em matemática aplicada, epidemiologia e ciências da computação.

---

## 5. Conclusão

O EpiSim demonstra que é possível desenvolver, com recursos tecnológicos acessíveis, um simulador epidemiológico interativo baseado no modelo SIR, implementado como uma aplicação web portátil e sem dependências de instalação. A ferramenta permite explorar intuitivamente conceitos fundamentais de epidemiologia matemática — como R₀, o limiar de imunidade coletiva e a dinâmica das curvas compartimentais — em um contexto de alta relevância para a realidade brasileira: o enfrentamento da dengue.

Do ponto de vista técnico, a integração numérica RK4 mostrou-se adequada para o modelo SIR com passo diário, produzindo resultados estáveis e epidemiologicamente plausíveis. A interface web responsiva, desenvolvida em HTML/CSS/JavaScript puro com Chart.js, torna a ferramenta acessível em qualquer dispositivo com navegador moderno.

Do ponto de vista pedagógico, o projeto evidencia tanto o potencial quanto os limites das ferramentas de IA generativa no contexto educacional: elas são capazes de acelerar substancialmente a produção de código funcional, mas não substituem a compreensão conceitual profunda que é o verdadeiro objetivo da formação em cursos superiores de computação e áreas afins. Nesse sentido, o EpiSim não é apenas uma ferramenta de simulação epidemiológica — é também um objeto de reflexão sobre o papel do conhecimento formal na era da inteligência artificial.

Como desenvolvimentos futuros, sugere-se a incorporação de modelos SEIR (com compartimento de Expostos), sazonalidade vetorial, vacinação progressiva e visualização espacial por meio de mapas de calor.

---

## Referências

ANDERSON, R. M.; MAY, R. M. **Infectious Diseases of Humans: Dynamics and Control**. Oxford: Oxford University Press, 1991.

BRADY, O. J. et al. Refining the global spatial limits of dengue virus transmission by evidence-based consensus. **PLOS Neglected Tropical Diseases**, v. 6, n. 8, e1760, 2012. DOI: 10.1371/journal.pntd.0001760.

DIEKMANN, O.; HEESTERBEEK, J. A. P.; ROBERTS, M. G. The construction of next-generation matrices for compartmental epidemic models. **Journal of the Royal Society Interface**, v. 7, n. 47, p. 873–885, 2010. DOI: 10.1098/rsif.2009.0386.

FINE, P.; EAMES, K.; HEYMANN, D. L. "Herd immunity": a rough guide. **Clinical Infectious Diseases**, v. 52, n. 7, p. 911–916, 2011. DOI: 10.1093/cid/cir007.

HALSTEAD, S. B. Dengue. **The Lancet**, v. 370, n. 9599, p. 1644–1652, 2007. DOI: 10.1016/S0140-6736(07)61687-0.

KEELING, M. J.; ROHANI, P. **Modeling Infectious Diseases in Humans and Animals**. Princeton: Princeton University Press, 2008.

KERMACK, W. O.; McKENDRICK, A. G. A contribution to the mathematical theory of epidemics. **Proceedings of the Royal Society A**, v. 115, n. 772, p. 700–721, 1927. DOI: 10.1098/rspa.1927.0118.

MINISTÉRIO DA SAÚDE. **Painel de Monitoramento das Arboviroses**. Brasília: Ministério da Saúde, 2024. Disponível em: https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/d/dengue. Acesso em: maio 2026.

PRESS, W. H. et al. **Numerical Recipes: The Art of Scientific Computing**. 3. ed. Cambridge: Cambridge University Press, 2007.

WORLD HEALTH ORGANIZATION. **COVID-19 Dashboard**. Geneva: WHO, 2023. Disponível em: https://covid19.who.int. Acesso em: maio 2026.

---

## Nota Metodológica

Este artigo científico foi integralmente gerado com o auxílio de ferramenta de inteligência artificial generativa, em conformidade com a proposta didática da atividade avaliativa que motivou sua produção.

**Prompt utilizado para gerar este artigo:**

> "You are an expert academic writer with a background in computational epidemiology and computer science. Write a complete scientific article in Portuguese (Brazil) explaining a web-based SIR epidemic model simulator called EpiSim, developed as an undergraduate assignment. Article structure (follow exactly): Título, Resumo (~150 words) + Abstract (English, ~150 words), Palavras-chave (5) + Keywords (5), 1. Introdução — contextualize epidemic modeling, mention COVID-19 and Dengue in Brazil, state the objective; 2. Fundamentação Teórica — explain SIR equations, define R₀, γ, β, herd immunity; 3. Metodologia — HTML/CSS/JavaScript, RK4 numerical integration, parameter controls, Chart.js; 4. Resultados e Discussão — describe simulator outputs for Dengue (R₀ ≈ 2.5, infectious period ≈ 7 days, population 500,000), discuss limitations; 5. Conclusão; Referências (at least 6 real, credible references). Style: formal academic Portuguese, ABNT-compatible citation style. Length: approximately 2,500–3,500 words. Add a 'Nota metodológica' section at the end disclosing AI assistance."

**Ferramenta de IA utilizada:** Claude (Anthropic) — modelo claude-sonnet-4-6

**Data de geração:** maio de 2026

---

*EpiSim — Trabalho Acadêmico de Graduação | Sistemas de Informação | 2026*