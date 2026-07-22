// One-page summary of the work, typeset with Typst — the same engine bundled
// inside Rubric, Zerkalo, and Gost. Rebuild with ./build-onepager.sh.

#set document(title: "Cal St Francis — Contemplative Software", author: "Cal St Francis")
#set page(
  paper: "us-letter",
  margin: (x: 1.5cm, y: 1.6cm),
  fill: rgb("#fdf6e8"),
)
#set text(font: ("Spectral", "Georgia", "Liberation Serif"), size: 9.5pt, fill: rgb("#28120c"))
#set par(justify: true, leading: 0.62em)

#let coral = rgb("#b83818")
#let olive = rgb("#4a6018")
#let dim = rgb("#7a5a38")

#let rule = line(length: 100%, stroke: 0.5pt + rgb("#c8b890"))

#let app(cyr, lat, gloss, role, body) = block(below: 0.75em)[
  #text(size: 11pt, fill: rgb("#28120c"))[#cyr]
  #h(0.35em)
  #if lat != "" [
    #text(size: 8.5pt, fill: dim)[\/ #lat]
    #h(0.35em)
  ]
  #text(size: 8pt, style: "italic", fill: dim)[#gloss]
  #linebreak()
  #text(size: 7pt, weight: "bold", fill: olive)[#upper(role)]
  #linebreak()
  #text(size: 8.8pt, fill: rgb("#4a2e18"))[#body]
]

#align(center)[
  #text(size: 22pt, fill: rgb("#28120c"))[Cal St Francis]
  #linebreak()
  #text(size: 9pt, fill: dim)[Candidate for Ordination, United Church of Canada · Halifax, Nova Scotia]
  #linebreak()
  #text(size: 8.5pt, fill: coral)[calstfrancis.github.io · github.com/calstfrancis · calstfrancis\@disroot.org]
]

#v(0.7em)
#rule
#v(0.5em)

#text(size: 9.2pt)[
  I build *contemplative software*: specialized tools for ministers, worship leaders, and
  academics, and narrative games rooted in liturgy, memory, and theology in the traditions
  of liberation and process. Everything is free, MIT-licensed, and distributed as Flatpaks
  from a self-hosted repository. No accounts, no cloud, no telemetry — every application
  writes plain files to your own disk, and syncs only to servers you already control.
]

#v(0.6em)
#rule
#v(0.6em)

#grid(
  columns: (1fr, 1fr),
  column-gutter: 1.2em,
  [
    #text(size: 8pt, weight: "bold", fill: coral)[#upper("Liturgical & Academic Tools")]
    #v(0.4em)

    #app("Зеркало", "Zerkalo", [“mirror”], "Typst IDE · Rust, GTK4")[
      Full academic Typst workplace. Templates for SBL, Chicago, APA, IEEE and Gost, live
      preview, document management, versioned backup through your own git remote, spellcheck,
      and export to PDF, DOCX and HTML.
    ]

    #app("Rubric", "", [“the red instruction”], "Liturgy Planner · Python, GTK4")[
      Plans worship from first reading to finished bulletin for United Church congregations.
      RCL lectionary, hymn lookup and scripture fetching feed a print-ready bulletin typeset
      with a bundled Typst engine.
    ]

    #app("Искра", "Iskra", [“spark”], "Sermon Planner · Rust, GTK4")[
      Preaching from structured notes rather than a full manuscript: single-line ideas that
      expand, group into movements, and reorder by hand. Scripture references autocomplete and
      build a bibliography; a chrome-free Preaching View is built for the pulpit.
    ]

    #app("ГОСТ", "Gost", [“the standard”], "Essay Templater · Python, GTK4")[
      Turns a manuscript into a ready-to-compile academic template in LaTeX, Typst, or Word —
      citation style, book layout and front matter handled, so writing starts immediately.
    ]

    #app("Скрижаль", "Skrizhal", [“tablet of the law”], "CV Database · Rust, GTK4")[
      YAML editor for CV elements, each keyed like a citation. A shared GTK-free core crate
      lets Zerkalo's CV mode read entries straight out of it.
    ]
  ],
  [
    #text(size: 8pt, weight: "bold", fill: coral)[#upper("Everyday Tools")]
    #v(0.4em)

    #app("Копилка", "Kopilka", [“money box”], "Couples Budget · Python + Kotlin")[
      Budget planner for two people — spending, income, debts and savings goals together.
      Data stays local or syncs through your own WebDAV server. An Android companion in
      Jetpack Compose shares the same files.
    ]

    #app("Мера", "Mera", [“measure, moderation”], "Firefox Extension")[
      One discipline: hold you to the number of tabs you decided was enough. Pinned tabs are
      never counted. The rule is yours; Мера simply keeps it.
    ]

    #v(0.5em)
    #text(size: 8pt, weight: "bold", fill: coral)[#upper("Interactive Fiction")]
    #v(0.4em)

    #app("Соборность", "Sobornost", [“unity in freedom”], "Narrative Engine · Plain JS")[
      Browser-native engine for contemplative, state-reactive interactive fiction. No build
      step, no dependencies. Soundings, theosis, charisms, branching dialogue, rituals.
    ]

    #app("The Severed Hours", "", [], "Text Adventure · Browser")[
      Noir interactive fiction set inside the offices of Drenthe & Associates, a firm whose
      promises of Continuity, Clarity and Compliance mask something far stranger.
    ]

    #app("Спасибо", "Spasibo", [“thank you”], "Theotic Mystery · Browser")[
      A contemplative mystery aboard a research schooner on a winter North Atlantic crossing.
      Theosis, soundings, cover, and the slow disclosure of memory.
    ]

    #v(0.6em)
    #block(
      fill: rgb("#eee4c8"),
      inset: 0.7em,
      radius: 4pt,
      width: 100%,
      text(size: 8pt, fill: rgb("#4a2e18"))[
        *Install everything at once* \
        #text(font: "Courier Prime", size: 7pt)[flatpak remote-add --if-not-exists calstfrancis \ https:\/\/calstfrancis.github.io/flatpak/calstfrancis.flatpakrepo]
      ],
    )
  ],
)

#v(0.5em)
#rule
#v(0.3em)
#align(center)[
  #text(size: 7.5pt, fill: dim, style: "italic")[
    Typeset with Typst — the same engine bundled inside Rubric, Zerkalo, and Gost. Freely given, freely received.
  ]
]
