module.exports = {
  data: {
    '@context': {
      '@version': 1.1,
      '@vocab': 'https://tropy.org/v1/tropy#',
      'template': {
        '@type': '@id'
      },
      'photo': {
        '@id': 'https://tropy.org/v1/tropy#photo',
        '@container': '@list'
      },
      'note': {
        '@id': 'https://tropy.org/v1/tropy#note',
        '@container': '@list'
      },
      'selection': {
        '@id': 'https://tropy.org/v1/tropy#selection',
        '@container': '@list'
      },
      'title': 'http://purl.org/dc/elements/1.1/title',
      'creator': 'http://purl.org/dc/elements/1.1/creator',
      'type': 'http://purl.org/dc/elements/1.1/type',
      'source': 'http://purl.org/dc/elements/1.1/source',
      'identifier': 'http://purl.org/dc/elements/1.1/identifier',
      'rights': 'http://purl.org/dc/elements/1.1/rights',
      'date': {
        '@id': 'http://purl.org/dc/elements/1.1/date',
        '@type': 'https://tropy.org/v1/tropy#date'
      },
      'extent': 'http://purl.org/dc/terms/extent',
      'audience': 'http://purl.org/dc/terms/audience',
      'coverage': 'http://purl.org/dc/elements/1.1/coverage',
      'publisher': 'http://purl.org/dc/elements/1.1/publisher',
      'LocationCreated': 'http://iptc.org/std/Iptc4xmpExt/2008-02-29/LocationCreated',
      'format': 'http://purl.org/dc/elements/1.1/format',
      'dcterms': 'http://purl.org/dc/terms/'
    },
    '@graph': [
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/generic',
        'title': 'An astronomical observatory on Mars: note',
        'creator': 'Carl Sagan',
        'type': 'Note',
        'source': 'Library of Congress',
        'collection': 'The Seth MacFarlane Collection of the Carl Sagan and Ann Druyan Archive',
        'identifier': 'https://www.loc.gov/item/cosmos000090/',
        'rights': 'https://www.loc.gov/item/cosmos000090/',
        'date': '1956-06-28',
        'box': '13',
        'folder': '2',
        'list': [
          'Chapter 2'
        ],
        'tag': [
          'LOC',
          'Transcribed',
          'Carl Sagan',
          'Astronomy'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '7b81ffe225a93b3fe48de5adaa6bb51b',
            'color': 'rgb(200,200,200,1)',
            'density': 72,
            'filename': 'service-mss-mss85590-088-088.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/service-mss-mss85590-088-088.pdf',
            'protocol': 'file',
            'size': 26795,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 796,
            'hue': 0,
            'mirror': false,
            'negative': true,
            'saturation': 0,
            'sharpen': 0,
            'width': 617,
            'title': 'service-mss-mss85590-088-088',
            'date': '2020-08-18T12:02:08.159Z'
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/generic',
        'title': 'An item with no data'
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/generic',
        'rights': 'https://www.jpl.nasa.gov/imagepolicy/',
        'collection': 'Visions of the Future',
        'creator': 'Jet Propulsion Laboratory (JPL)',
        'identifier': 'https://www.jpl.nasa.gov/visions-of-the-future/',
        'title': 'Atomic Clocks',
        'date': '2020',
        'type': 'Poster',
        'source': 'NASA',
        'list': [
          'Chapter 2',
          'NASA Posters'
        ],
        'tag': [
          'NASA',
          'Posters',
          'Needs Review'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '72bf2d142a5def10b2fab7777acd1d6e',
            'color': 'rgb(8,40,56,1)',
            'density': 72,
            'filename': 'atomic-clock-blue.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/atomic-clock-blue.pdf',
            'protocol': 'file',
            'size': 2803278,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 1296,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 864,
            'title': 'atomic-clock-blue',
            'date': '2020-08-11T00:07:44.131Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "One of three free posters celebrating NASA's Deep Space Atomic Clock. The mission will demonstrate technology that would allow a spacecraft to calculate its own trajectory rather than waiting for that information to come from Earth.",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>One of three free posters celebrating NASA's Deep Space Atomic Clock. The mission will demonstrate technology that would allow a spacecraft to calculate its own trajectory rather than waiting for that information to come from Earth.</p>",
                  '@language': 'en'
                }
              }
            ]
          },
          {
            '@type': 'Photo',
            'checksum': 'c2b046912b30054fd4033e4ba6421f2e',
            'color': 'rgb(8,40,56,1)',
            'density': 72,
            'filename': 'atomic-clock-orange.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/atomic-clock-orange.pdf',
            'protocol': 'file',
            'size': 1903170,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 1296,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 864,
            'title': 'atomic-clock-orange',
            'date': '2020-08-11T00:07:29.620Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "One of three free posters celebrating NASA's Deep Space Atomic Clock. The mission will demonstrate technology that would allow a spacecraft to calculate its own trajectory rather than waiting for that information to come from Earth.",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>One of three free posters celebrating NASA's Deep Space Atomic Clock. The mission will demonstrate technology that would allow a spacecraft to calculate its own trajectory rather than waiting for that information to come from Earth.</p>",
                  '@language': 'en'
                }
              }
            ]
          },
          {
            '@type': 'Photo',
            'checksum': '85bd34e63f35b0354d937bec5c88b265',
            'color': 'rgb(8,40,56,1)',
            'density': 72,
            'filename': 'atomic-clock-red.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/atomic-clock-red.pdf',
            'protocol': 'file',
            'size': 2101915,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 1296,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 864,
            'title': 'atomic-clock-red',
            'date': '2020-08-11T00:07:16.142Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "One of three free posters celebrating NASA's Deep Space Atomic Clock. The mission will demonstrate technology that would allow a spacecraft to calculate its own trajectory rather than waiting for that information to come from Earth.",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>One of three free posters celebrating NASA's Deep Space Atomic Clock. The mission will demonstrate technology that would allow a spacecraft to calculate its own trajectory rather than waiting for that information to come from Earth.</p>",
                  '@language': 'en'
                }
              }
            ],
            'selection': [
              {
                '@type': 'Selection',
                'template': 'https://tropy.org/v1/templates/selection',
                'x': 180,
                'y': 750,
                'angle': 0,
                'brightness': 0,
                'contrast': 0,
                'height': 87,
                'hue': 0,
                'mirror': false,
                'negative': false,
                'saturation': 0,
                'sharpen': 0,
                'width': 142,
                'note': [
                  {
                    '@type': 'Note',
                    'text': {
                      '@value': 'here’s a selection with a note',
                      '@language': 'en'
                    },
                    'html': {
                      '@value': '<p>here’s a selection with a note</p>',
                      '@language': 'en'
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/generic',
        'title': 'Briefing Notes for President Carter and Vice President Mondale',
        'creator': 'Sagan, Carl',
        'date': '~1977-12',
        'type': 'Note',
        'source': 'Library of Congress',
        'collection': 'The Seth MacFarlane Collection of the Carl Sagan and Ann Druyan Archive',
        'box': '3',
        'folder': '12',
        'identifier': 'https://www.loc.gov/item/cosmos000103',
        'rights': 'https://www.loc.gov/item/cosmos000103',
        'photo': [
          {
            '@type': 'Photo',
            'checksum': 'a9c8cdd325b834acab7b6351e7701203',
            'color': 'rgb(216,216,216,1)',
            'density': 72,
            'filename': 'Carl Sagan Handwritten note.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/Carl Sagan Handwritten note.pdf',
            'protocol': 'file',
            'size': 44944,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 828,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 652,
            'title': 'Carl Sagan Handwritten note',
            'date': '2021-05-19T12:25:50.336Z'
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/id#YVJK35Lvf',
        'title': 'Earth',
        'collection': 'Visions of the Future',
        'identifier': 'https://www.jpl.nasa.gov/visions-of-the-future/',
        'rights': 'https://www.jpl.nasa.gov/imagepolicy/',
        'date': '2020',
        'creator': 'Jet Propulsion Laboratory (JPL)',
        'type': 'Poster',
        'source': 'NASA',
        'list': [
          'Chapter 1',
          'NASA Posters'
        ],
        'tag': [
          'NASA',
          'Posters',
          'Planets'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': 'd05b90b1353c18b426f9acdf204f5810',
            'color': 'rgb(248,248,248,1)',
            'density': 72,
            'filename': 'earth.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/earth.pdf',
            'protocol': 'file',
            'size': 10843879,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 2160,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 1440,
            'title': 'earth',
            'date': '2020-08-10T19:49:55.514Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "There's no place like home. Warm, wet and with an atmosphere that's just right, Earth is the only place we know of with life – and lots of it. JPL's Earth science missions monitor our home planet and how it's changing so it can continue to provide a safe haven as we reach deeper into the cosmos.",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>There's no place like home. Warm, wet and with an atmosphere that's just right, Earth is the only place we know of with life – and lots of it. JPL's Earth science missions monitor our home planet and how it's changing so it can continue to provide a safe haven as we reach deeper into the cosmos.</p>",
                  '@language': 'en'
                }
              }
            ],
            'selection': [
              {
                '@type': 'Selection',
                'template': 'https://tropy.org/v1/templates/selection',
                'x': 555,
                'y': 1696,
                'angle': 0,
                'brightness': 0,
                'contrast': 0,
                'height': 209,
                'hue': 0,
                'mirror': false,
                'negative': false,
                'saturation': 0,
                'sharpen': 0,
                'width': 756,
                'title': {
                  '@type': 'text',
                  '@value': 'Your Oasis in Space'
                }
              }
            ]
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/id#YVJK35Lvf',
        'title': 'Jupiter',
        'collection': 'Visions of the Future',
        'identifier': 'https://www.jpl.nasa.gov/visions-of-the-future/',
        'rights': 'https://www.jpl.nasa.gov/imagepolicy/',
        'date': '2020',
        'creator': 'Jet Propulsion Laboratory (JPL)',
        'type': 'Poster',
        'source': 'NASA',
        'list': [
          'Chapter 1',
          'NASA Posters'
        ],
        'tag': [
          'NASA',
          'Posters',
          'Planets'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '81e49701ea17a682506dc9a2a10d13dc',
            'color': 'rgb(248,248,248,1)',
            'density': 72,
            'filename': 'jupiter.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/jupiter.pdf',
            'protocol': 'file',
            'size': 14301536,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 2160,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 1440,
            'title': 'jupiter',
            'date': '2020-08-10T23:36:17.377Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "The Jovian cloudscape boasts the most spectacular light show in the solar system, with northern and southern lights to dazzle even the most jaded space traveler. Jupiter's auroras are hundreds of times more powerful than Earth's, and they form a glowing ring around each pole that's bigger than our home planet. Revolving outside this auroral oval are the glowing, electric “footprints” of Jupiter's three largest moons. NASA's Juno mission will observe Jupiter's auroras from above the polar regions, studying them in a way never before possible.",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>The Jovian cloudscape boasts the most spectacular light show in the solar system, with northern and southern lights to dazzle even the most jaded space traveler. Jupiter's auroras are hundreds of times more powerful than Earth's, and they form a glowing ring around each pole that's bigger than our home planet. Revolving outside this auroral oval are the glowing, electric “footprints” of Jupiter's three largest moons. NASA's Juno mission will observe Jupiter's auroras from above the polar regions, studying them in a way never before possible.</p>",
                  '@language': 'en'
                }
              }
            ],
            'selection': [
              {
                '@type': 'Selection',
                'template': 'https://tropy.org/v1/templates/selection',
                'x': 145,
                'y': 1990,
                'angle': 0,
                'brightness': 0,
                'contrast': 0,
                'height': 85,
                'hue': 0,
                'mirror': false,
                'negative': false,
                'saturation': 0,
                'sharpen': 0,
                'width': 1161,
                'title': {
                  '@type': 'text',
                  '@value': 'Poster Description'
                }
              },
              {
                '@type': 'Selection',
                'template': 'https://tropy.org/v1/templates/selection',
                'x': 757,
                'y': 831,
                'angle': 0,
                'brightness': 0,
                'contrast': 0,
                'height': 467,
                'hue': 0,
                'mirror': false,
                'negative': false,
                'saturation': 0,
                'sharpen': 0,
                'width': 384,
                'title': {
                  '@type': 'text',
                  '@value': 'Balloon'
                }
              }
            ]
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/id#YVJK35Lvf',
        'title': 'Lava Life',
        'collection': 'Visions of the Future',
        'identifier': 'https://www.jpl.nasa.gov/visions-of-the-future/',
        'rights': 'https://www.jpl.nasa.gov/imagepolicy/',
        'date': '2020',
        'creator': 'Jet Propulsion Laboratory (JPL)',
        'type': 'Poster',
        'source': 'NASA',
        'list': [
          'Chapter 1',
          'NASA Posters'
        ],
        'tag': [
          'NASA',
          'Posters',
          'Needs Review'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '52bd5ebdbd7d5a59d77bc43716b22cea',
            'color': 'rgb(232,216,200,1)',
            'density': 72,
            'filename': '55-cancri-e.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/55-cancri-e.pdf',
            'protocol': 'file',
            'size': 10239349,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 2822,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 1958,
            'title': '55-cancri-e',
            'date': '2020-08-10T23:42:02.374Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "A global ocean of lava under sparkling, silicate skies reflecting the lava below: what better choice for an extrreme vacation? Planet Janssen, or 55 Cancri e, orbits a star called Copernicus only 41 light years away. The molten surface is completely uninhabitable, but you'll ride safely above, taking in breathtaking views: the burning horizon, Janssen's sister planet Galileo hanging in a dark sky, and curtains of glowing particles as you glide across the terminator to Janssen's dark side. Book your travel now to the hottest vacation spot in the galaxy, 55 Cancri e.",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>A global ocean of lava under sparkling, silicate skies reflecting the lava below: what better choice for an extrreme vacation? Planet Janssen, or 55 Cancri e, orbits a star called Copernicus only 41 light years away. The molten surface is completely uninhabitable, but you'll ride safely above, taking in breathtaking views: the burning horizon, Janssen's sister planet Galileo hanging in a dark sky, and curtains of glowing particles as you glide across the terminator to Janssen's dark side. Book your travel now to the hottest vacation spot in the galaxy, 55 Cancri e.</p>",
                  '@language': 'en'
                }
              }
            ]
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/id#YVJK35Lvf',
        'title': 'Mars',
        'creator': 'Jet Propulsion Laboratory (JPL)',
        'date': '2020',
        'rights': 'https://www.jpl.nasa.gov/imagepolicy/',
        'identifier': 'https://www.jpl.nasa.gov/visions-of-the-future/',
        'collection': 'Visions of the Future',
        'extent': '20x30 inches',
        'type': 'Poster',
        'source': 'NASA',
        'list': [
          'Chapter 1',
          'NASA Posters'
        ],
        'tag': [
          'NASA',
          'Posters',
          'Planets'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '3bf7a2a087990c8387bdf23d23ff371d',
            'color': 'rgb(232,40,40,1)',
            'density': 72,
            'filename': 'mars.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/mars.pdf',
            'protocol': 'file',
            'size': 2816025,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 2160,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 1440,
            'title': 'mars',
            'date': '2020-08-10T23:34:58.344Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "NASA's Mars Exploration Program seeks to understand whether Mars was, is, or can be a habitable world. Missions like Mars Pathfinder, Mars Exploration Rovers, Mars Science Laboratory and Mars Reconnaissance Orbiter, among many others, have provided important information in understanding of the habitability of Mars. This poster imagines a future day when we have achieved our vision of human exploration of Mars and takes a nostalgic look back at the great imagined milestones of Mars exploration that will someday be celebrated as “historic sites.”",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>NASA's Mars Exploration Program seeks to understand whether Mars was, is, or can be a habitable world. Missions like Mars Pathfinder, Mars Exploration Rovers, Mars Science Laboratory and Mars Reconnaissance Orbiter, among many others, have provided important information in understanding of the habitability of Mars. This poster imagines a future day when we have achieved our vision of human exploration of Mars and takes a nostalgic look back at the great imagined milestones of Mars exploration that will someday be celebrated as “historic sites.”</p>",
                  '@language': 'en'
                }
              }
            ]
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/correspondence',
        'creator': 'Sagan, Carl',
        'date': '1988-12-05',
        'source': 'Library of Congress',
        'collection': 'The Seth MacFarlane Collection of the Carl Sagan and Ann Druyan Archive',
        'title': 'Sagan to Grinspoon comments on dissertation',
        'box': '3',
        'folder': '12',
        'identifier': 'https://www.loc.gov/item/cosmos000022/',
        'rights': 'https://www.loc.gov/item/cosmos000022/',
        'type': 'Correspondence',
        'audience': 'Grinspoon, David',
        'coverage': 'Ithaca, New York',
        'tag': [
          'NASA',
          'Needs Review',
          'Carl Sagan'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '9404664081b608efa4f38a7c16fc7f34',
            'color': 'rgb(200,200,200,1)',
            'density': 72,
            'filename': null,
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Metadata Video/Sagan Letter.pdf',
            'protocol': 'file',
            'size': 142300,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 824,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 645,
            'title': 'Sagan Letter',
            'date': '2021-05-19T12:32:05.529Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': 'here’s an item note?',
                  '@language': 'en'
                },
                'html': {
                  '@value': '<p>here’s an item note?</p>',
                  '@language': 'en'
                }
              }
            ]
          },
          {
            '@type': 'Photo',
            'checksum': '9404664081b608efa4f38a7c16fc7f34',
            'color': 'rgb(200,200,200,1)',
            'density': 72,
            'filename': null,
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 1,
            'path': '/home/caro/Metadata Video/Sagan Letter.pdf',
            'protocol': 'file',
            'size': 142300,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 824,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 645,
            'title': 'Sagan Letter',
            'date': '2021-05-19T12:32:05.529Z'
          },
          {
            '@type': 'Photo',
            'checksum': '9404664081b608efa4f38a7c16fc7f34',
            'color': 'rgb(200,200,200,1)',
            'density': 72,
            'filename': null,
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 2,
            'path': '/home/caro/Metadata Video/Sagan Letter.pdf',
            'protocol': 'file',
            'size': 142300,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 830,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 645,
            'title': 'Sagan Letter',
            'date': '2021-05-19T12:32:05.529Z'
          },
          {
            '@type': 'Photo',
            'checksum': '9404664081b608efa4f38a7c16fc7f34',
            'color': 'rgb(200,200,200,1)',
            'density': 72,
            'filename': null,
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 3,
            'path': '/home/caro/Metadata Video/Sagan Letter.pdf',
            'protocol': 'file',
            'size': 142300,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 830,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 645,
            'title': 'Sagan Letter',
            'date': '2021-05-19T12:32:05.529Z'
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/generic',
        'type': 'Newspaper',
        'title': 'Space Agency Bill Is Voted By Senate',
        'publisher': 'The New York Times',
        'LocationCreated': 'New York, New York, U.S.',
        'identifier': '114560497',
        'format': 'PDF',
        'source': 'ProQuest Historical Newspapers: The New York Times',
        'dcterms:identifier': 'https://search-proquest-com.proxy.libraries.rutgers.edu/docview/114560497?accountid=13626',
        'creator': 'Special to the New York Times',
        'rights': 'Copyright New York Times Company Jun 17, 1958',
        'collection': 'The New York Times',
        'date': '1958-06-17',
        'list': [
          'Chapter 2'
        ],
        'tag': [
          'Planets',
          'Transcribed'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '0228d3c62aa8ac5a625a6b5171228076',
            'color': 'rgb(248,248,248,1)',
            'density': 72,
            'filename': 'NYTimes NASA.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/NYTimes NASA.pdf',
            'protocol': 'file',
            'size': 768558,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 1705,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 40,
            'width': 1167,
            'title': 'NYTimes NASA',
            'date': '2020-08-18T12:59:55.192Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': 'The Senate paused in its labor debate today and quickly approved legislation creating a national space agency and a powerful space policy board.',
                  '@language': 'en'
                },
                'html': {
                  '@value': '<p>The Senate paused in its labor debate today and quickly approved legislation creating a national space agency and a powerful space policy board.</p>',
                  '@language': 'en'
                }
              }
            ],
            'selection': [
              {
                '@type': 'Selection',
                'template': 'https://tropy.org/v1/templates/selection',
                'x': 166,
                'y': 310,
                'angle': 0,
                'brightness': 0,
                'contrast': 0,
                'height': 397,
                'hue': 0,
                'mirror': false,
                'negative': false,
                'saturation': 0,
                'sharpen': 0,
                'width': 140
              }
            ]
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/id#YVJK35Lvf',
        'title': 'The Grand Tour',
        'collection': 'Visions of the Future',
        'identifier': 'https://www.jpl.nasa.gov/visions-of-the-future/',
        'rights': 'https://www.jpl.nasa.gov/imagepolicy/',
        'date': '2020',
        'creator': 'Jet Propulsion Laboratory (JPL)',
        'type': 'Poster',
        'source': 'NASA',
        'list': [
          'Chapter 1',
          'NASA Posters'
        ],
        'tag': [
          'NASA',
          'Posters'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '3285716495fc4d84dfc03b0af947cb5f',
            'color': 'rgb(248,232,200,1)',
            'density': 72,
            'filename': 'grand_tour.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/grand_tour.pdf',
            'protocol': 'file',
            'size': 2893743,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': 0,
            'contrast': 0,
            'height': 2160,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 0,
            'sharpen': 0,
            'width': 1440,
            'title': 'grand_tour',
            'date': '2020-08-10T23:35:20.815Z',
            'note': [
              {
                '@type': 'Note',
                'text': {
                  '@value': "NASA's Voyager mission took advantage of a once-every-175-year alignment of the outer planets for a grand tour of the solar system. The twin spacecraft revealed details about Jupiter, Saturn, Uranus and Neptune – using each planet's gravity to send them on to the next destination. Voyager set the stage for such ambitious orbiter missions as Galileo to Jupiter and Cassini to Saturn. Today both Voyager spacecraft continue to return valuable science from the far reaches of our solar system.",
                  '@language': 'en'
                },
                'html': {
                  '@value': "<p>NASA's Voyager mission took advantage of a once-every-175-year alignment of the outer planets for a grand tour of the solar system. The twin spacecraft revealed details about Jupiter, Saturn, Uranus and Neptune – using each planet's gravity to send them on to the next destination. Voyager set the stage for such ambitious orbiter missions as Galileo to Jupiter and Cassini to Saturn. Today both Voyager spacecraft continue to return valuable science from the far reaches of our solar system.</p>",
                  '@language': 'en'
                }
              },
              {
                '@type': 'Note',
                'text': {
                  '@value': 'here’s a second note for this photo',
                  '@language': 'en'
                },
                'html': {
                  '@value': '<p>here’s a second note for this photo</p>',
                  '@language': 'en'
                }
              }
            ]
          }
        ]
      },
      {
        '@type': 'Item',
        'template': 'https://tropy.org/v1/templates/generic',
        'publisher': 'Chapel Hill Weekly',
        'LocationCreated': 'Chapel Hill, North Carolina, U.S.',
        'source': 'Library of Congress',
        'collection': 'Chronicling America',
        'format': 'PDF',
        'dcterms:identifier': 'https://chroniclingamerica.loc.gov/lccn/sn92073229/1962-08-26/ed-1/seq-1/',
        'rights': 'https://chroniclingamerica.loc.gov/about/',
        'date': '1962-08-26',
        'type': 'Newspaper',
        'title': 'UNC May Get Major Space Research Center',
        'creator': 'Chapel Hill Weekly',
        'list': [
          'Chapter 1'
        ],
        'tag': [
          'LOC',
          'Periodicals'
        ],
        'photo': [
          {
            '@type': 'Photo',
            'checksum': '39ab7ea6139caeec6df1c2ed6da3c6bb',
            'color': 'rgb(216,216,216,1)',
            'density': 72,
            'filename': 'ChapelHillWeekly.pdf',
            'mimetype': 'application/pdf',
            'orientation': 1,
            'page': 0,
            'path': '/home/caro/Downloads/ChapelHillWeekly.pdf',
            'protocol': 'file',
            'size': 2885717,
            'template': 'https://tropy.org/v1/templates/photo',
            'angle': 0,
            'brightness': -50,
            'contrast': 40,
            'height': 1676,
            'hue': 0,
            'mirror': false,
            'negative': false,
            'saturation': 50,
            'sharpen': 50,
            'width': 1199,
            'title': 'ChapelHillWeekly',
            'date': '2020-08-18T11:50:27.267Z',
            'selection': [
              {
                '@type': 'Selection',
                'template': 'https://tropy.org/v1/templates/selection',
                'x': 871,
                'y': 294,
                'angle': 0,
                'brightness': -49,
                'contrast': 31,
                'height': 919,
                'hue': 0,
                'mirror': false,
                'negative': false,
                'saturation': -2,
                'sharpen': 100,
                'width': 309
              }
            ]
          }
        ]
      }
    ],
    'version': '1.11.2-beta.1'
  }
}
