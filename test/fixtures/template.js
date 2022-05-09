module.exports = {
  defaultItemTemplate: {
    id: 'https://tropy.org/v1/templates/generic',
    type: 'https://tropy.org/v1/tropy#Item',
    name: 'Tropy Generic',
    version: '1.0.0',
    creator: 'RRCHNM',
    description: 'General template to fit a generic archival object',
    isProtected: true,
    created: '2019-03-02 21:01:44',
    domain: [],
    fields: [
      {
        id: 1,
        property: 'http://purl.org/dc/elements/1.1/title',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: null,
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 2,
        property: 'http://purl.org/dc/elements/1.1/creator',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: 'Author or creator',
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 3,
        property: 'http://purl.org/dc/elements/1.1/date',
        label: null,
        datatype: 'https://tropy.org/v1/tropy#date',
        hint: 'ISO format (YYYY-MM-DD)',
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 4,
        property: 'http://purl.org/dc/elements/1.1/type',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: 'Type of document or object',
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 5,
        property: 'http://purl.org/dc/elements/1.1/source',
        label: 'Archive',
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: 'Name of the holding archive',
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 6,
        property: 'https://tropy.org/v1/tropy#collection',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: null,
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 7,
        property: 'https://tropy.org/v1/tropy#box',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: null,
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 8,
        property: 'https://tropy.org/v1/tropy#folder',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: null,
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 9,
        property: 'http://purl.org/dc/elements/1.1/identifier',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: 'URL or call number',
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 10,
        property: 'http://purl.org/dc/elements/1.1/rights',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: null,
        value: null,
        isConstant: false,
        isRequired: true
      }
    ]
  },
  defaultPhotoTemplate: {
    id: 'https://tropy.org/v1/templates/photo',
    type: 'https://tropy.org/v1/tropy#Photo',
    name: 'Tropy Photo',
    version: '1.0.0',
    creator: null,
    description: null,
    isProtected: true,
    created: '2019-03-02 21:01:44',
    domain: [],
    fields: [
      {
        id: 38,
        property: 'http://purl.org/dc/elements/1.1/title',
        label: null,
        datatype: 'http://www.w3.org/2001/XMLSchema#string',
        hint: null,
        value: null,
        isConstant: false,
        isRequired: false
      },
      {
        id: 39,
        property: 'http://purl.org/dc/elements/1.1/date',
        label: null,
        datatype: 'https://tropy.org/v1/tropy#date',
        hint: null,
        value: null,
        isConstant: false,
        isRequired: false
      }
    ]
  }
}
