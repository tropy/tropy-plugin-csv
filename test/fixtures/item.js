const { singlePhotoSingleNote,
  singlePhotoManyNote,
  manyPhoto } = require('./photo')

const itemSinglePhotoExpected = {
  title: 'Space Agency Bill Is Voted By Senate',
  creator: 'Special to the New York Times',
  itemDate: '1958-06-17',
  itemType: 'Newspaper',
  source: 'ProQuest Historical Newspapers: The New York Times',
  collection: 'The New York Times',
  box: '',
  folder: '',
  identifier: '114560497',
  rights: 'Copyright New York Times Company Jun 17, 1958',
  photoPath: singlePhotoSingleNote[0]['https://tropy.org/v1/tropy#path'][0]['@value'],
  photoTitle: singlePhotoSingleNote[0]['http://purl.org/dc/elements/1.1/title'][0]['@value'],
  photoDate: singlePhotoSingleNote[0]['http://purl.org/dc/elements/1.1/date'][0]['@value'],
  photoNote: singlePhotoSingleNote[0]['https://tropy.org/v1/tropy#note'][0]['@list'][0]['https://tropy.org/v1/tropy#text'][0]['@value'],
  tags: ['Planets', 'Transcribed']
}

const itemManyNoteExpected = {
  firstNote: singlePhotoManyNote[0]['https://tropy.org/v1/tropy#note'][0]['@list'][0]['https://tropy.org/v1/tropy#text'][0]['@value'],
  secondNote: singlePhotoManyNote[0]['https://tropy.org/v1/tropy#note'][0]['@list'][1]['https://tropy.org/v1/tropy#text'][0]['@value']

}

const itemManyPhotoExpected = {
  firstPhotoPath: manyPhoto[0]['https://tropy.org/v1/tropy#path'][0]['@value'],
  lastPhotoNote: manyPhoto[2]['https://tropy.org/v1/tropy#note'][0]['@list'][0]['https://tropy.org/v1/tropy#text'][0]['@value']

}
module.exports = {
  itemSinglePhotoExpected,
  itemManyPhotoExpected,
  itemManyNoteExpected,
  itemSinglePhoto: {
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
        '@value': itemSinglePhotoExpected.collection
      }
    ],
    'http://purl.org/dc/elements/1.1/creator': [
      {
        '@value': itemSinglePhotoExpected.creator
      }
    ],
    'http://purl.org/dc/elements/1.1/date': [
      {
        '@type': 'https://tropy.org/v1/tropy#date',
        '@value': itemSinglePhotoExpected.itemDate
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
        '@value': itemSinglePhotoExpected.identifier
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
        '@value': itemSinglePhotoExpected.rights
      }
    ],
    'http://purl.org/dc/elements/1.1/source': [
      {
        '@value': itemSinglePhotoExpected.source
      }
    ],
    'https://tropy.org/v1/tropy#tag': [
      {
        '@value': itemSinglePhotoExpected.tags[0]
      },
      {
        '@value': itemSinglePhotoExpected.tags[1]
      }
    ],
    'https://tropy.org/v1/tropy#template': [
      {
        '@id': 'https://tropy.org/v1/templates/generic'
      }
    ],
    'http://purl.org/dc/elements/1.1/title': [
      {
        '@value': itemSinglePhotoExpected.title
      }
    ],
    'http://purl.org/dc/elements/1.1/type': [
      {
        '@value': itemSinglePhotoExpected.itemType
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
