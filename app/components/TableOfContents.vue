<script setup lang="ts">
const pages = [
  {
    label: 'Introduction',
    hash: 4
  },
  {
    label: 'Game Set-up',
    hash: 5
  },
  {
    label: 'The X-Files (TM) CCG Advanced Turn Sequence',
    hash: 8
  },
  {
    label: 'Pools',
    hash: 10,
    children: [
      {
        label: 'Resource Pool',
        hash: 11
      },
      {
        label: 'Conspiracy Pool',
        hash: 12
      }
    ]
  },
  {
    label: 'Playing Cards',
    hash: 14,
    children: [
      {
        label: 'Agent Cards',
        hash: 15
      },
      {
        label: 'Activators',
        hash: 16
      },
      {
        label: 'Keywords',
        hash: 17
      },
      {
        label: 'Resources',
        hash: 17
      }
    ]
  },
  {
    label: 'Detailed Advanced Turn Explanations',
    hash: 18,
    children: [
      {
        label: 'Briefing Phase',
        hash: 18
      },
      {
        label: 'Healing Phase',
        hash: 20
      },
      {
        label: 'Requisition Phase',
        hash: 21
      },
      {
        label: 'Deployment Phase',
        hash: 23,
        children: [
          {
            label: 'Teams',
            hash: 23
          }
        ]
      },
      {
        label: 'Case Assignment Phase',
        hash: 24,
        children: [
          {
            label: 'The Bluff',
            hash: 25
          }
        ]
      },
      {
        label: 'Investigation Phase',
        hash: 27,
        children: [
          {
            label: 'Skill Check Subroutine',
            hash: 28
          },
          {
            label: 'Combat',
            hash: 31,
            children: [
              {
                label: 'Long Range Combat (LRC)',
                hash: 32
              },
              {
                label: 'Close Range Combat (CRC)',
                hash: 33
              },
              {
                label: 'Tracking Damage',
                hash: 34
              },
              {
                label: 'Combat Cards',
                hash: 35
              }
            ]
          },
          {
            label: 'Site Resolution',
            hash: 37
          }
        ]
      },
      {
        label: 'Debriefing Phase',
        hash: 38
      }
    ]
  },
  {
    label: 'Multi-Player Changes',
    hash: 40
  },
  {
    label: 'Optional Rules',
    hash: 42
  },
  {
    label: 'Deck Construction',
    hash: 46
  },
  {
    label: 'The Nine Different Suits',
    hash: 48,
    children: [
      {
        label: 'Event Cards',
        hash: 50
      },
      {
        label: 'Witness Cards',
        hash: 51
      },
      {
        label: 'Bluff Cards',
        hash: 52
      },
      {
        label: 'Equipment Cards',
        hash: 53
      },
      {
        label: 'Combat Cards',
        hash: 54
      },
      {
        label: 'Adversary Cards',
        hash: 55
      },
      {
        label: 'Site Cards',
        hash: 56
      },
      {
        label: 'Agent Cards',
        hash: 57
      },
      {
        label: 'X-File Cards',
        hash: 58,
        children: [
          {
            label: 'Affiliations',
            hash: 60
          },
          {
            label: 'Motives',
            hash: 61
          },
          {
            label: 'Methods',
            hash: 62
          },
          {
            label: 'Results',
            hash: 63
          }
        ]
      }
    ]
  },
  {
    label: 'Glossary',
    hash: 64
  },
  {
    label: 'Glossary: Skills',
    hash: 65
  },
  {
    label: 'Advanced Game Quick Reference',
    children: [
      {
        label: 'Sequence of Play',
        hash: 68
      }
    ]
  }
];
</script>

<template>
  <unordered-list :items="pages" />
</template>
