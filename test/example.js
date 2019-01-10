module.exports = {
  'dataset': {
    'dimension': {
      'NACE': {
        'label': 'industry',
        'category': {
          'index': {
            '47': 0
          },
          'label': {
            '47': 'Retail trade, except of motor vehicles and motorcycles'
          }
        },
        'link': {
          'describedby': [
            {
              'extension': {
                'NACE': 'urn:ssb:classification:klass:6'
              }
            }
          ]
        }
      },
      'Tid': {
        'label': 'month',
        'category': {
          'index': {
            '2017M11': 0,
            '2017M12': 1,
            '2018M01': 2,
            '2018M02': 3,
            '2018M03': 4,
            '2018M04': 5,
            '2018M05': 6,
            '2018M06': 7,
            '2018M07': 8,
            '2018M08': 9,
            '2018M09': 10,
            '2018M10': 11,
            '2018M11': 12
          },
          'label': {
            '2017M11': '2017M11',
            '2017M12': '2017M12',
            '2018M01': '2018M01',
            '2018M02': '2018M02',
            '2018M03': '2018M03',
            '2018M04': '2018M04',
            '2018M05': '2018M05',
            '2018M06': '2018M06',
            '2018M07': '2018M07',
            '2018M08': '2018M08',
            '2018M09': '2018M09',
            '2018M10': '2018M10',
            '2018M11': '2018M11'
          }
        }
      },
      'ContentsCode': {
        'label': 'contents',
        'category': {
          'index': {
            'VolumSesong': 0
          },
          'label': {
            'VolumSesong': 'Volume index seasonally adjusted'
          },
          'unit': {
            'VolumSesong': {
              'base': 'index',
              'decimals': 1
            }
          }
        }
      },
      'id': [
        'NACE',
        'Tid',
        'ContentsCode'
      ],
      'size': [
        1,
        13,
        1
      ],
      'role': {
        'time': [
          'Tid'
        ],
        'metric': [
          'ContentsCode'
        ]
      }
    },
    'label': '07129: Index of retail sales, by industry, month and contents',
    'source': 'Statistics Norway',
    'updated': '2019-01-10T19:25:00Z',
    'value': [
      103.1,
      102.3,
      101.8,
      102.1,
      102.5,
      103,
      105.1,
      102.2,
      102.6,
      103,
      102.5,
      102.3,
      103.2
    ]
  }
}
