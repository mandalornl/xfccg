<script setup lang="ts">
</script>

<template>
  <layout-content>
    <section class="preservation-society">
      <h1>Head on over to the <span>The X-Files CCG Preservation Society</span> Facebook page and join now!</h1>
      <a
        href="https://facebook.com/groups/xfilesccgps"
        target="_blank"
      >
        <img
          src="/preservation-society-640.jpg"
          srcset="
            /preservation-society-640.jpg 640w,
            /preservation-society-768.jpg 768w,
            /preservation-society-1024.jpg 1024w,
            /preservation-society-1366.jpg 1366w,
            /preservation-society-1600.jpg 1600w,
            /preservation-society-1920.jpg 1920w
          "
          sizes="100vw"
          alt="Preservation Society"
        >
      </a>
    </section>
    <section>
      <h1>The X-Files Collectible Card Game</h1>
      <p>Is an out-of-print collectible card game based on The X-Files fictional universe. It was developed by NXT Games and published by the US Playing Card Company (USPCC).</p>
      <h2>Gameplay</h2>
      <p>A game of The X-Files is played between two players using decks of cards representing characters, equipment, events, and locations from the television show. At the beginning of the game, each player selects an X-File card and places it face down, and the winner of the game is the first player to correctly guess the identity of the opponent's X-File. To gather clues about the X-File card, players play Site cards and move Agent cards to those locations. If they can fulfill the investigation requirements of the Site, they can ask a yes or no question about the opponent's X-File card. Players can attempt to interfere in their opponent's investigations by playing Event, Bluff, and Adversary cards of their own.</p>
      <h2>History</h2>
      <p>The Premier Set was released in 1996 and debuted at Gen Con. Initially, 80 million cards were shipped on November 1st, 1996. Over the next year, USPCC would create the first expansion, 101361, a 2nd edition set known as The Truth Is Out There, and a number of promotional cards. The second expansion, 22364 was apparently finished and ready to be produced, when the game was terminated in 1997. Three collector sets were also cancelled.</p>
      <p class="text-caption">
        Source:
        <a
          href="https://en.wikipedia.org/wiki/The_X-Files_Collectible_Card_Game"
          target="_blank"
        >
          Wiki
        </a>
      </p>
    </section>
  </layout-content>
</template>

<style lang="scss" scoped>
.preservation-society {
  margin-bottom: 16px;

  h1 span {
    color: rgb(var(--v-theme-primary));
  }

  a {
    display: block;

    text-decoration: none;

    img {
      display: block;

      max-width: 100%;
    }
  }
}
</style>
