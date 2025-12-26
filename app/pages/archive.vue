<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

useHead({
  title: 'Archive',
});

const items = [
  {
    title: 'Ancillary Documentation',
    subtitle: 'Stephen David Wark',
    href: `${runtimeConfig.app.baseURL}files/xfccg-ancillary-documentation.pdf`,
    download: 'The X-Files CCG - Ancillary Documentation.pdf',
    icon: 'mdi-file-pdf-box',
    iconColor: 'light-blue',
  },
  {
    title: 'Rules Assistant',
    subtitle: 'Chris Heard',
    href: `${runtimeConfig.app.baseURL}files/xfccg-rules-assistant.pdf`,
    download: 'The X-Files CCG - Rules Assistant.pdf',
    icon: 'mdi-file-pdf-box',
    iconColor: 'light-blue',
  },
  {
    title: 'FCU Cube',
    subtitle: 'Alastair \'TheJauntyGoblin\' Headden',
    href: `${runtimeConfig.app.baseURL}files/xfccg-fcu-cube.pdf`,
    icon: 'mdi-file-pdf-box',
    iconColor: 'light-blue',
  },
  {
    title: 'Alien Investigations',
    subtitle: 'Are you a fan of the long-defunct The X-Files Collectible Card Game (CCG)? Are you interested in watching the game and learning how to play? Then look no further!',
    href: 'https://www.youtube.com/@AlienInvestigations_xfilesccg',
    icon: 'mdi-youtube',
    iconColor: 'red',
  },
  {
    title: 'Mike and Matt',
    subtitle: 'A Channel devoted solely to the X Files Card Game. Hosted by Matt and Mike who have been playing the game since 1996!',
    href: 'https://www.youtube.com/@MMXFILESCCG',
    icon: 'mdi-youtube',
    iconColor: 'red',
  },
  {
    title: 'Studio Sequim',
    subtitle: 'Anything related to customizable card games, including and not limited to The X-Files CCG.',
    href: 'https://www.youtube.com/@studiosequim',
    icon: 'mdi-youtube',
    iconColor: 'red',
  },
  {
    title: 'Chasing The Dragon',
    subtitle: 'A little Internet corner dedicated to nerd culture with a strong focus on CCGs including the X-Files.',
    href: 'https://www.youtube.com/@chasingthedragonmedia',
    icon: 'mdi-youtube',
    iconColor: 'red',
  },
  {
    title: 'The X-Files CCG Preservation Society',
    subtitle: 'The X-Files Preservation Society seeks to raise awareness about this beloved albeit short-lived card game. Our society\'s creative team is involved in a multi-expansion project that picks up where the game left off in 1997 with comprehensive card expansions for each season of the show, feature films, and related spin-offs.',
    lines: 'three',
    href: 'https://facebook.com/groups/xfilesccgps',
    icon: 'mdi-facebook',
    iconColor: '#4267B2',
  },
  {
    title: 'The X-Files Collectible Card Game',
    subtitle: 'For fans and collectors of The X-Files CCG, originally produced and distributed by The United States Playing Card Company.',
    href: 'https://www.facebook.com/groups/xfccg',
    icon: 'mdi-facebook',
    iconColor: '#4267B2',
  },
  {
    title: 'xfilesccg',
    subtitle: 'Celebrating all things relating to The X-Files Customizable Card Game (CCG), produced briefly by the United States Playing Card Co in the mid-1990s.',
    href: 'https://www.instagram.com/xfilesccg',
    icon: 'mdi-instagram',
    iconColor: '#D300C5',
  },
  {
    title: 'r/TheXFilesCCG',
    subtitle: 'A subreddit for The X-Files CCG',
    href: 'https://www.reddit.com/r/TheXFilesCCG',
    icon: 'mdi-reddit',
    iconColor: '#ff3300',
  },
  {
    title: 'Tabletop Simulator - The X-Files CCG',
    subtitle: 'A great way to play the game online using a custom made module for TTS.',
    href: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2384875184',
    icon: 'mdi-steam',
    iconColor: 'blue darken-4',
  }
];
</script>

<template>
  <layout-content
    title="Archive"
    size="medium"
  >
    <v-list lines="two">
      <v-list-item
        v-for="item of items"
        :key="item.title"
        :title="item.title"
        :subtitle="item.subtitle"
        :lines="item.lines"
        :href="item.href"
        :download="item.download"
        target="_blank"
      >
        <template #append>
          <v-icon
            :icon="item.icon"
            :color="item.iconColor"
          />
        </template>
      </v-list-item>
    </v-list>
  </layout-content>
</template>
