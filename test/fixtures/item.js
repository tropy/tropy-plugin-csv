const { singlePhotoSingleNote,
  singlePhotoManyNote,
  manyPhoto } = require('./photo')


module.exports = {
  minimalItem: {
    '@type': [
      'https://tropy.org/v1/tropy#Item'
    ],
    'https://tropy.org/v1/tropy#template': [
      {
        '@id': 'https://tropy.org/v1/templates/generic'
      }
    ],
    'http://purl.org/dc/elements/1.1/title': [
      {
        '@value': 'An item with no data'
      }
    ]
  }, itemSinglePhoto: {
    '@type': [
      'https://tropy.org/v1/tropy#Item'
    ],
    'http://iptc.org/std/Iptc4xmpExt/2008-02-29/LocationCreated': [
      {
        '@value': 'New York, New York, U.S.'
      }
    ],
    'https://tropy.org/v1/tropy#collection': [
      {
        '@value': 'The New York Times'
      }
    ],
    'http://purl.org/dc/elements/1.1/creator': [
      {
        '@value': 'Special to the New York Times'
      }
    ],
    'http://purl.org/dc/elements/1.1/date': [
      {
        '@type': 'https://tropy.org/v1/tropy#date',
        '@value': '1958-06-17'
      }
    ],
    'http://purl.org/dc/terms/identifier': [
      {
        '@value': 'https://search-proquest-com.proxy.libraries.rutgers.edu/docview/114560497?accountid=13626'
      }
    ],
    'http://purl.org/dc/elements/1.1/format': [
      {
        '@value': 'PDF'
      }
    ],
    'http://purl.org/dc/elements/1.1/identifier': [
      {
        '@value': '114560497'
      }
    ],
    'https://tropy.org/v1/tropy#list': [
      {
        '@value': 'Chapter 2'
      }
    ],
    'https://tropy.org/v1/tropy#photo': [
      {
        '@list': singlePhotoSingleNote
      }
    ],
    'http://purl.org/dc/elements/1.1/publisher': [
      {
        '@value': 'The New York Times'
      }
    ],
    'http://purl.org/dc/elements/1.1/rights': [
      {
        '@value': 'Copyright New York Times Company Jun 17, 1958'
      }
    ],
    'http://purl.org/dc/elements/1.1/source': [
      {
        '@value': 'ProQuest Historical Newspapers: The New York Times'
      }
    ],
    'https://tropy.org/v1/tropy#tag': [
      {
        '@value': 'Planets'
      },
      {
        '@value': 'Transcribed'
      }
    ],
    'https://tropy.org/v1/tropy#template': [
      {
        '@id': 'https://tropy.org/v1/templates/generic'
      }
    ],
    'http://purl.org/dc/elements/1.1/title': [
      {
        '@value': 'Space Agency Bill Is Voted By Senate'
      }
    ],
    'http://purl.org/dc/elements/1.1/type': [
      {
        '@value': 'Newspaper'
      }
    ]
  }, itemNoPhoto: {
    '@type': [
      'https://tropy.org/v1/tropy#Item'
    ],
    'http://iptc.org/std/Iptc4xmpExt/2008-02-29/LocationCreated': [
      {
        '@value': 'New York, New York, U.S.'
      }
    ],
    'https://tropy.org/v1/tropy#collection': [
      {
        '@value': 'The New York Times'
      }
    ],
    'http://purl.org/dc/elements/1.1/creator': [
      {
        '@value': 'Special to the New York Times'
      }
    ],
    'http://purl.org/dc/elements/1.1/date': [
      {
        '@type': 'https://tropy.org/v1/tropy#date',
        '@value': '1958-06-17'
      }
    ],
    'http://purl.org/dc/terms/identifier': [
      {
        '@value': 'https://search-proquest-com.proxy.libraries.rutgers.edu/docview/114560497?accountid=13626'
      }
    ],
    'http://purl.org/dc/elements/1.1/format': [
      {
        '@value': 'PDF'
      }
    ],
    'http://purl.org/dc/elements/1.1/identifier': [
      {
        '@value': '114560497'
      }
    ],
    'https://tropy.org/v1/tropy#list': [
      {
        '@value': 'Chapter 2'
      }
    ],

    'http://purl.org/dc/elements/1.1/publisher': [
      {
        '@value': 'The New York Times'
      }
    ],
    'http://purl.org/dc/elements/1.1/rights': [
      {
        '@value': 'Copyright New York Times Company Jun 17, 1958'
      }
    ],
    'http://purl.org/dc/elements/1.1/source': [
      {
        '@value': 'ProQuest Historical Newspapers: The New York Times'
      }
    ],
    'https://tropy.org/v1/tropy#tag': [
      {
        '@value': 'Planets'
      },
      {
        '@value': 'Transcribed'
      }
    ],
    'https://tropy.org/v1/tropy#template': [
      {
        '@id': 'https://tropy.org/v1/templates/generic'
      }
    ],
    'http://purl.org/dc/elements/1.1/title': [
      {
        '@value': 'Space Agency Bill Is Voted By Senate'
      }
    ],
    'http://purl.org/dc/elements/1.1/type': [
      {
        '@value': 'Newspaper'
      }
    ]
  },
  itemSinglePhotoManyNote: {
    '@type': [
      'https://tropy.org/v1/tropy#Item'
    ],
    'https://tropy.org/v1/tropy#collection': [
      {
        '@value': 'Visions of the Future'
      }
    ],
    'http://purl.org/dc/elements/1.1/creator': [
      {
        '@value': 'Jet Propulsion Laboratory (JPL)'
      }
    ],
    'http://purl.org/dc/elements/1.1/date': [
      {
        '@type': 'https://tropy.org/v1/tropy#date',
        '@value': '2020'
      }
    ],
    'http://purl.org/dc/elements/1.1/identifier': [
      {
        '@value': 'https://www.jpl.nasa.gov/visions-of-the-future/'
      }
    ],
    'https://tropy.org/v1/tropy#list': [
      {
        '@value': 'Chapter 1'
      },
      {
        '@value': 'NASA Posters'
      }
    ],
    'https://tropy.org/v1/tropy#photo': [
      {
        '@list': singlePhotoManyNote
      }
    ],
    'http://purl.org/dc/elements/1.1/rights': [
      {
        '@value': 'https://www.jpl.nasa.gov/imagepolicy/'
      }
    ],
    'http://purl.org/dc/elements/1.1/source': [
      {
        '@value': 'NASA'
      }
    ],
    'https://tropy.org/v1/tropy#tag': [
      {
        '@value': 'NASA'
      },
      {
        '@value': 'Posters'
      }
    ],
    'https://tropy.org/v1/tropy#template': [
      {
        '@id': 'https://tropy.org/v1/templates/id#YVJK35Lvf'
      }
    ],
    'http://purl.org/dc/elements/1.1/title': [
      {
        '@value': 'The Grand Tour'
      }
    ],
    'http://purl.org/dc/elements/1.1/type': [
      {
        '@value': 'Poster'
      }
    ]
  }, itemManyPhoto: {
    '@type': [
      'https://tropy.org/v1/tropy#Item'
    ],
    'https://tropy.org/v1/tropy#collection': [
      {
        '@value': 'Visions of the Future'
      }
    ],
    'http://purl.org/dc/elements/1.1/creator': [
      {
        '@value': 'Jet Propulsion Laboratory (JPL)'
      }
    ],
    'http://purl.org/dc/elements/1.1/date': [
      {
        '@type': 'https://tropy.org/v1/tropy#date',
        '@value': '2020'
      }
    ],
    'http://purl.org/dc/elements/1.1/identifier': [
      {
        '@value': 'https://www.jpl.nasa.gov/visions-of-the-future/'
      }
    ],
    'https://tropy.org/v1/tropy#list': [
      {
        '@value': 'Chapter 2'
      },
      {
        '@value': 'NASA Posters'
      }
    ],
    'https://tropy.org/v1/tropy#photo': [
      {
        '@list': manyPhoto
      }
    ],
    'http://purl.org/dc/elements/1.1/rights': [
      {
        '@value': 'https://www.jpl.nasa.gov/imagepolicy/'
      }
    ],
    'http://purl.org/dc/elements/1.1/source': [
      {
        '@value': 'NASA'
      }
    ],
    'https://tropy.org/v1/tropy#tag': [
      {
        '@value': 'NASA'
      },
      {
        '@value': 'Posters'
      },
      {
        '@value': 'Needs Review'
      }
    ],
    'https://tropy.org/v1/tropy#template': [
      {
        '@id': 'https://tropy.org/v1/templates/generic'
      }
    ],
    'http://purl.org/dc/elements/1.1/title': [
      {
        '@value': 'Atomic Clocks'
      }
    ],
    'http://purl.org/dc/elements/1.1/type': [
      {
        '@value': 'Poster'
      }
    ]
  }
}
