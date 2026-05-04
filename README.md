# EpiSim 🦟

> **Simulador Web Interativo do Modelo Epidemiológico SIR**  
> Modelagem do espalhamento de doenças infectocontagiosas — contexto: Dengue no Brasil

---

## Sobre o Projeto

O **EpiSim** é uma aplicação web interativa que simula a propagação de doenças infectocontagiosas utilizando o modelo epidemiológico **SIR** (Suscetíveis → Infectados → Recuperados). A ferramenta permite visualizar em tempo real como parâmetros como o número de reprodução básico (R₀) e o período infeccioso influenciam a dinâmica de uma epidemia.

O projeto foi desenvolvido como atividade acadêmica da disciplina de graduação em **Sistemas de Informação (UFRPE)**, com o objetivo de ilustrar como ferramentas de inteligência artificial generativa podem ser utilizadas para construir artefatos funcionais — e o que isso implica do ponto de vista da formação técnica.

---

## Demo

Abra o arquivo `index.html` diretamente no navegador. **Nenhuma instalação necessária.**

```
git clone https://github.com/SEU-USUARIO/episim.git
cd episim
# abra o index.html no seu navegador favorito
```

---

## Funcionalidades

- **Simulação SIR completa** com integração numérica por Runge-Kutta de 4ª ordem (RK4)
- **Controles interativos** via sliders para todos os parâmetros do modelo
- **Gráfico dinâmico** com as curvas S(t), I(t) e R(t) renderizadas via Chart.js
- **Métricas automáticas**: pico de infectados, dia do pico, total de casos e limiar de imunidade coletiva
- **Painel explicativo** em português com as equações e definição de cada parâmetro
- **Responsivo** — funciona em desktop e mobile
- **Zero dependências locais** — arquivo único `.html`, funciona offline

---

## Parâmetros do Modelo

| Parâmetro | Descrição | Padrão | Intervalo |
|-----------|-----------|--------|-----------|
| **N** | População total | 500.000 | 10k – 2M |
| **I₀** | Infectados no dia 0 | 10 | 1 – 1.000 |
| **R₀** | Número básico de reprodução | 2,5 | 0,5 – 10 |
| **1/γ** | Período infeccioso (dias) | 7 | 1 – 30 |
| **T** | Duração da simulação (dias) | 365 | 30 – 365 |

---

## O Modelo SIR

O modelo divide a população em três compartimentos e descreve sua dinâmica por equações diferenciais ordinárias:

```
dS/dt = -β · S · I / N
dI/dt =  β · S · I / N - γ · I
dR/dt =  γ · I

onde:
  β = R₀ · γ          (taxa de transmissão)
  γ = 1 / período      (taxa de recuperação)
  p_c = 1 - 1/R₀       (limiar de imunidade coletiva)
```

A integração numérica é feita pelo método **RK4** com passo de 1 dia.

---

## Estrutura do Repositório

```
episim/
│
├── index.html           # Aplicação web completa (simulador)
├── artigo.md            # Artigo científico explicando o projeto
├── README.md            # Este arquivo
│
├── prompts/
│   ├── prompt-codigo.txt    # Prompt usado para gerar o código
│   └── prompt-artigo.txt    # Prompt usado para gerar o artigo
```

---

## Tecnologias

| Tecnologia | Uso |
|------------|-----|
| HTML5 / CSS3 | Estrutura e estilização da interface |
| JavaScript ES6+ | Lógica da simulação e manipulação do DOM |
| [Chart.js 4.4](https://www.chartjs.org/) | Renderização do gráfico (via CDN) |
| [Google Fonts](https://fonts.google.com/) | Tipografia (Space Mono + DM Sans) |
| [Claude — Anthropic](https://claude.ai) | Geração do código e do artigo via IA |

---

## Geração por Inteligência Artificial

Este projeto foi desenvolvido com o auxílio da ferramenta de IA generativa **Claude** (Anthropic). Tanto o código (`index.html`) quanto o artigo científico (`artigo.md`) foram gerados a partir de prompts estruturados em linguagem natural — disponíveis na pasta `/prompts`.

Os prompts completos utilizados estão documentados no próprio código (bloco de comentário no topo do `index.html`) e no arquivo `artigo.md` (seção *Nota metodológica*).

> ⚠️ **Nota pedagógica:** A capacidade de gerar código funcional via IA não substitui a compreensão dos conceitos subjacentes — epidemiologia matemática, métodos numéricos, desenvolvimento web. O objetivo desta atividade é justamente refletir sobre essa distinção.

---

## Referências Científicas

- KERMACK, W. O.; McKENDRICK, A. G. (1927). *Proceedings of the Royal Society A*, 115(772), 700–721.
- ANDERSON, R. M.; MAY, R. M. (1991). *Infectious Diseases of Humans*. Oxford University Press.
- KEELING, M. J.; ROHANI, P. (2008). *Modeling Infectious Diseases in Humans and Animals*. Princeton UP.
- BRADY et al. (2012). *PLOS Neglected Tropical Diseases*, 6(8), e1760.
- MINISTÉRIO DA SAÚDE. Painel de Monitoramento das Arboviroses, 2024.
- WHO. COVID-19 Dashboard, 2023.

---

## Autor

**Daniel Moreira de França**  
Estudante de Sistemas de Informação — UFRPE  
Recife, PE — 2026

---

## Licença

Este projeto é de uso acadêmico livre. Sinta-se à vontade para estudar, modificar e reutilizar o código com devida atribuição.