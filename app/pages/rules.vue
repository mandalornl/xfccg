<script setup lang="ts">
import { useDisplay } from 'vuetify';

import {
  type Card,
  CardSet as CardSetEnum,
  CardType as CardTypeEnum,
} from '~/types/card';
import { sample } from '~/utils/sample';

useHead({
  title: 'Advanced Rules and Procedures Manual',
});

const display = useDisplay();
const pool = await usePool([
  CardSetEnum.Premiere,
]);

const drawCardByCostType = (costType: string): Card => (
  sample<Card>(pool.filter((card) => card.cost?.endsWith(costType)))!
);

const resourceCard = computed<Card>(() => drawCardByCostType('RP'));
const conspiracyCard = computed<Card>(() => drawCardByCostType('CP'));
const starCard = computed<Card>(() => drawCardByCostType('*P'));

const drawCardByType = (cardType: CardTypeEnum): Card => (
  sample<Card>(pool.filter((card) => card.type === cardType))!
);

const adversaryCard = computed<Card>(() => drawCardByType(CardTypeEnum.Adversary));
const agentCard = computed<Card>(() => drawCardByType(CardTypeEnum.Agent));
const bluffCard = computed<Card>(() => drawCardByType(CardTypeEnum.Bluff));
const combatCard = computed<Card>(() => drawCardByType(CardTypeEnum.Combat));
const equipmentCard = computed<Card>(() => drawCardByType(CardTypeEnum.Equipment));
const eventCard = computed<Card>(() => drawCardByType(CardTypeEnum.Event));
const siteCard = computed<Card>(() => drawCardByType(CardTypeEnum.Site));
const witnessCard = computed<Card>(() => drawCardByType(CardTypeEnum.Witness));
const xFileCard = computed<Card>(() => drawCardByType(CardTypeEnum.XFile));

const typicalCard = computed<Card>(() => (sample(pool)!));

const findCardById = (id: string): Card => (pool.find((card) => card.id === id)!);

const townsendWICard = computed<Card>(() => findCardById('XF96-0067v1'));
const glock19Card = computed<Card>(() => findCardById('XF96-0317v1'));
const scullyCard = computed<Card>(() => findCardById('XF96-0172v1'));
const shotgunCard = computed<Card>(() => findCardById('XF96-0329v1'));

const players = [
  'Stephen',
  'Guillaume',
  'David',
  'Nathan',
  'Joost',
  'Alastair',
  'Jonathan',
  'Mike',
  'Nick',
  'Franck',
  'Matt',
  'Dave',
  'Alfredo',
];

const playerOne = computed<string>(() => sample(players)!);
const playerTwo = computed<string>(() => (sample(players.filter((name) => name !== playerOne.value))!));

const threeCardWidth = computed<number>(() => {
  if (display.xs.value) {
    return 80;
  }

  if (display.sm.value) {
    return 192;
  }

  return 256;
});
</script>

<template>
  <layout-content title="Advanced Rules and Procedures Manual">
    <section>
      <h2>Table of Contents</h2>
      <table-of-contents class="mb-4" />
    </section>
    <rule-page page="4">
      <copy-link value="4">
        <h2>The X-Files<sup>TM</sup> Collectible Card Game</h2>
      </copy-link>
      <p>Welcome to <b>The X-Files Collectible Card Game</b> Advanced Game. The Advanced Game incorporates many of the nuances of <b>The X-Files</b> television series and is designed for the more serious gamer and <b>The X-Files</b> fan.</p>
      <p>If you have not previously read the <b>Basic Game</b> rule book, we recommend that you read pages <hash-link value="4" /> through <hash-link value="7" />; these pages will give you an introduction to <b>The X-Files Collectible Card Game</b> and the game's objective. If you are proceeding to the Advanced Game after learning the Basic Game, go on to the <b>Game Setup</b> section on the following page.</p>
      <p>In the Advanced Game, you will construct your deck of cards for game play. This gives each player greater control over the outcome of the game than in the Basic Game, where players use Starter Decks.The Advanced Game will allow each player to cater their Agents and cards to the Skills and strategy desired. It will be up to you to help Mulder and Scully solve their current X-File.</p>
    </rule-page>
    <rule-page page="5">
      <copy-link value="5">
        <h2>Advanced Game Set-up</h2>
      </copy-link>
      <p>The <b>Advanced Game</b> is designed for two or more players. The game is won by the first player who identifies one opponent's X-File. Game set-up for Advanced Game is similar to that of the Basic Game.</p>
      <p>For the Advanced Game, remove all Keyword <b>"Killer"</b> cards (see <b>Killer Cards</b> on page <hash-link value="42" />). An explanation of all card types can be found on pages <hash-link value="48" /> through <hash-link value="63" /> of these rules. Agent cards may also be included in your deck for use during the game. They are shuffled into your deck and may assist for one turn (see <b>Playing Cards</b> section on page <hash-link value="14" />). Separate your X-File cards and place them to the side.</p>
      <p>In the Advanced Game, you will be <u>constructing</u> your <b>Bureau Deck</b>. Your deck must have a minimum of sixty cards but may have more if you like. Your starting Agents and the X-File do not count toward this minimum. You may choose any cards, provided no more than two of the same card are used. You may include Agents in your deck. An Agent from your hand can be used to help out for one turn.</p>
      <p>Pay attention to the <b>Cost</b> to play each card. Having many cards that you cannot afford to play can de detrimental (see the <b>Playing Cards</b> section on page <hash-link value="41" />). Note that you will probably want to create the Bureau Deck in conjunction with selecting Agents and an X-File. For additional Deck Construction suggestions, see page <hash-link value="46" /> of these rules.</p>
      <p>As in the Basic Game, select an X-File card.Place your X-File face down in a prominent place, as you may need to refer to it when your opponent asks questions.</p>
    </rule-page>
    <rule-page page="6">
      <copy-link value="6">
        <h3>Advanced Game Set-up continued…</h3>
      </copy-link>
      <p>In the Advanced Game, you may choose any number of Agents you like for your initial <b>Team</b>, provided there are no duplicates and the sum of all Agents' Costs does not exceed 20.The Agent's Cost is a rating relative to each Agent's game value and appears in the lower right corner of the Agent card. Your Team should be a minimum of three Agents, but can be more. Each player is allowed to have the same Agent.</p>
      <p>Each player divides the surface area they are playing on into three sections: the <b>Bureau</b>, the <b>Fields</b> and the <b>Hospital</b>. Your Agents begin the game in the Bureau section.</p>
      <p>Create a <b>Discard Pile</b> face-up next to your Bureau Deck when it becomes necessary. This will be used for discarding excess cards and cards you have used. Should the Bureau Deck ever run out of cards, shuffle your Discard Pile to recreate the Bureau Deck and continue play.</p>
      <p><b>The X-Files Notebook</b> and <b>tokens</b> will also be needed for the Advanced Game. The Notebook is a checklist used to track information about your opponent's X-File(s). Tokens will be used to track certain information</p>
      <p class="mb-0">
        <b>Advanced Game Set-up Summary</b>:
      </p>
      <ol>
        <li>Construct your 60-card Bureau Deck.</li>
        <li>Select an X-File Card.</li>
        <li>Select your team of Agents.</li>
        <li>Divide playing surface into Bureau, Field and Hospital.</li>
        <li>Shuffle and cut your cards. Deal out 7 to begin the game.</li>
        <li>Randomly decide who goes first.</li>
      </ol>
    </rule-page>
    <rule-page page="7">
      <copy-link value="7">
        <h2>Advanced Game Table Diagram</h2>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <v-img
          src="/advanced-game-table-diagram.jpg"
          alt="Advanced Game Table Diagram"
          width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="8">
      <copy-link value="8">
        <h2>The X-Files Advanced Game Turn Sequence</h2>
      </copy-link>
      <p>The player whose turn it is will be referred to as the <b>Investigating (Active) Player</b>. Other players are referred to as the <b>Directed Player</b> (if they have a <b>Site</b> directed at them by the Investigating Player), or <b>Non-active Player</b> (everyone else in a multi-player game).</p>
      <ol>
        <li>
          <b>Briefing Phase</b>
          <ol class="list-style-type--lower-alpha">
            <li>The Investigating Player may draw one card.</li>
            <li>The Investigating Player may use his Agents to create Resource Points (RP's) and the may buy cards at the rate of <b>1</b> RP each.</li>
            <li>All players except for the Investigating Player may discard cards with an RP value and gain an equal number of Conspiracy Points (CP's). These players may purchase cards at the price of <b>1</b> CP each.</li>
          </ol>
        </li>
        <li>
          <b>Healing Phase (applies to all Agents in the Hospital)</b>
          <ol class="list-style-type--lower-alpha">
            <li>Agents with 0-3 HEALTH heal on point damage.</li>
            <li>Agents with 4+ HEALTH heal two points damage.</li>
          </ol>
        </li>
        <li>
          <b>Requisition Phase</b>
          <ol class="list-style-type--lower-alpha">
            <li>The Investigating Player may pay for and assign Equipment to any Agent who meets the Equipment card's requirement.</li>
            <li>Agents in the same location may exchange Equipment.</li>
          </ol>
        </li>
      </ol>
    </rule-page>
    <rule-page page="9">
      <ol start="5">
        <li>
          <b>Case Assignment Phase</b>
          <ol class="list-style-type--lower-alpha">
            <li>The Investigating Player places Sites in his Field section.</li>
            <li>The Investigating Player announces which opponent each Site will be directed toward.</li>
            <li>All opponents may assign Bluffs to any Sites played.</li>
          </ol>
        </li>
        <li>
          <b>Investigation Phase</b>
          <ol class="list-style-type--lower-alpha">
            <li>New Agent Teams may be designated for the Field Section.</li>
            <li>The Investigating Player decides which Teams they will send to each Site.</li>
            <li>Each Site investigated is resolved separately.<br>The Investigating Player chooses a resolution sequence.</li>
            <li>Investigating Player starts a Skill Check Subroutine on the Site card.</li>
            <li>Bluffs are revealed and resolved.</li>
            <li>Any player may pay for and play cards. The effects are immediately resolved.</li>
            <li>
              When Combat is initiated, investigation activities cease and the Combat is immediately resolved.<br>The Combat order proceeds as follows:
              <ol class="list-style-type--lower-roman">
                <li>LONG RANGE COMBAT (LRC). Damage allocation.</li>
                <li>CLOSE RANGE COMBAT (CRC). Damage allocation.</li>
                <li>Repeat CLOSE RANGE COMBAT rounds until the Adversary is killed or all Agents are sent to the Hospital.</li>
              </ol>
            </li>
            <li>If the Agents successfully meet the Site Prerequisite after completing the Skill Check Subroutine, they may ask the Directed Player a question and/or guess their X-File identity.</li>
          </ol>
        </li>
        <li>
          <b>Debriefing Phase</b><br>All players may discard cards.
        </li>
      </ol>
    </rule-page>
    <rule-page page="10">
      <copy-link value="10">
        <h2>Pools</h2>
      </copy-link>
      <p>In the Advanced Game, cards must be paid for in order to use their effects. This is done through the use of two pools: the <b>Resource Pool (RP)</b> and <b>Conspiracy Pool (CP)</b>. Each player will have one Conspiracy Pool and one Resource Pool.</p>
      <v-alert
        type="info"
        text="At the beginning of an Advanced Game, create the Resource Pool by placing five tokens in your Bureau section. Create the Conspiracy Pool by placing five tokens by your X-File."
      />
      <p>The Resource and Conspiracy Pools are used to pay for cards played by each player. All cards will have an <b>RP</b>, <b>CP</b> or <b>*P</b> icon - <icon-resource-pool />, <icon-conspiracy-pool /> or <icon-star-pool /> -- under their Cost.</p>
      <v-table class="mb-4">
        <tbody>
          <tr>
            <td class="text-no-wrap">
              <b>RP</b> <icon-resource-pool />
            </td>
            <td>May be played by the Active (Investigating) Player. The Cost must be paid from the Resource Pool.</td>
          </tr>
          <tr>
            <td class="text-no-wrap">
              <b>CP</b> <icon-conspiracy-pool />
            </td>
            <td>May be played by any player other than the Investigating Player. The Cost must be paid from the Conspiracy Pool.</td>
          </tr>
          <tr>
            <td class="text-no-wrap">
              <b>*P</b> <icon-star-pool />
            </td>
            <td>May be played by any player. A *P Cost card played to benefit the Agents must be paid for from the Resource Pool. A *P Cost card played to benefit the Conspiracy must be paid for from the Conspiracy Pool.</td>
          </tr>
        </tbody>
      </v-table>
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <p class="d-flex justify-center ga-2">
          <card-image
            :card="resourceCard"
            :max-width="threeCardWidth"
          />
          <card-image
            :card="conspiracyCard"
            :max-width="threeCardWidth"
          />
          <card-image
            :card="starCard"
            :max-width="threeCardWidth"
          />
        </p>
        <p>Examples of <icon-resource-pool /> (RP), <icon-conspiracy-pool /> (CP) and <icon-star-pool /> (*P) cost icons as seen on cards.</p>
      </v-alert>
    </rule-page>
    <rule-page page="11">
      <copy-link value="11">
        <h2>Resource Pool</h2>
      </copy-link>
      <p>Your <b>Resource Pool</b> represents the resource the Bureau has at its disposal. Resource Points are used to pay for the cards that assist your Agents. These cards have an <icon-resource-pool /> or <icon-star-pool /> under their Cost.</p>
      <p>During the <b>Briefing Phase</b>, you will have a chance to add to your Resource Pool. Every Agent has a Resource (<b>RES</b>) number listed on the upper right section of the card.</p>
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <card-image
          :card="agentCard"
          max-width="256"
          class="mx-auto"
        />
        An example of an Agent card's RES Number.
      </v-alert>
      <p>Add up all Agent's RES numbers. This is the number of tokens that may be added to the Resource Pool at the beginning of your turn. Agents in the Hospital during the Briefing Phase do not contribute their RES number to create <icon-resource-pool />s. After adding the <icon-resource-pool />s to your pool, you may then purchase cards. Each card costs <b>1</b> <icon-resource-pool />. Purchased cards are always taken from the top of the Bureau Deck. All cards must be purchased at once. A player may not purchase cards and then decide to purchase more after looking at the cards purchased. Regardless of how many cards are bought, no player's hand may exceed seven cards (but can be less) at the end of a turn.</p>
      <p>To keep the Resource Pool and Conspiracy Pool separate, we suggest putting the Resource Pool in the Bureau and the Conspiracy Pool by your X-File card.</p>
    </rule-page>
    <rule-page page="12">
      <copy-link value="12">
        <h2>Conspiracy Pool</h2>
      </copy-link>
      <p>Each player's X-File also has a pool used to purchase cards played. This is called the <b>Conspiracy Pool</b>. Your Conspiracy Pool represents the resources your X-File has at its disposal. Conspiracy Points are used to pay for cards used by the X-File to oppose investigations. These cards have a <icon-conspiracy-pool /> or <icon-star-pool /> under their cost.</p>
      <p>Replenishment of the Conspiracy Pool happens primarily during the opposing player's turn. When the Investigating Player has finished creating <icon-resource-pool />s and buying cards during the Briefing Phase, all players other than the Investigating Player have the following options:</p>
      <ol>
        <li>The player to the Investigating Player's left may choose to discard cards from their hand with an <icon-resource-pool /> or <icon-star-pool /> Cost and add this number of <icon-conspiracy-pool />s to their Conspiracy Pool. Thus, a card with <b>3</b> <icon-conspiracy-pool /> Cost could be discarded in exchange for <b>3</b> <icon-conspiracy-pool />s.</li>
        <li>After the player has completed turning in cards, they may buy cards. Cards may be purchased for <b>1</b> <icon-conspiracy-pool /> each. Purchased cards are always taken from the top of the Bureau Deck. Regardless of how many cards are bought, any player's hand may not exceed seven cards (but can be less) at the end of a turn.</li>
      </ol>
      <p>In a multi-player game, continue to each player's left until all players have had these options.</p>
      <v-alert
        type="info"
        text="Each player must sell all cards desired prior to purchasing cards. All cards must be purchased at once. A player may not purchase cards and then decide to purchase more after looking at the cards purchased."
      />
      <v-alert type="info">
        Agent cards included in your Bureau Deck may be sold for their RES (Resource) number of <icon-conspiracy-pool />, not their Cost number.
      </v-alert>
    </rule-page>
    <rule-page page="13">
      <copy-link value="13">
        <h3>Turn Example: Game Setup</h3>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
      >
        <p>{{ playerOne }} and {{ playerTwo }} are about to play a two-player Advanced Game. Each player constructs a sixty-card deck. Both players now choose an X-File and place the card face down. {{ playerOne }} selects Agents Fox Mulder, Dana Scully, Special Agent Karen Kosseff, and Jerry Lamana prior to starting the game. Agents Mulder and Scully each have a cost of <b>7</b> <icon-resource-pool />. Agents Kosseff and Lamana each have a Cost of <b>3</b> <icon-resource-pool />. {{ playerOne }}'s Agent's total Cost is <b>20</b>. Since he is allowed no more than <b>20</b> <icon-resource-pool /> for his starting Agents, this is a valid selection. He could have selected any Agents with a total Cost of <b>20</b> or less. {{ playerTwo }} also selects <b>20</b> points worth of Agents.</p>
        <p>{{ playerOne }} and {{ playerTwo }} each create Bureau, Field and Hospital Sections on their playing surface. Each player places his Agents in the Bureau to start the game. Both player shuffle their cards and have the opponent cut them. These cards are placed face down in their Bureau Sections and become the Bureau decks. {{ playerOne }} and {{ playerTwo }} draw seven cards each to begin play.</p>
        <p>Each player now creates a Resource Pool (<icon-resource-pool />) and a Conspiracy Pool (<icon-conspiracy-pool />). {{ playerOne }} uses pennies as <icon-resource-pool /> tokens and places five by his Bureau Deck to create this pool. He uses nickels for <icon-resource-pool /> tokens and places five by his X-File card. {{ playerTwo }} does the same. {{ playerOne }} wins a coin toss and elects to go first. {{ playerOne }} and {{ playerTwo }} are now ready to begin the Advanced Game.</p>
      </v-alert>
    </rule-page>
    <rule-page page="14">
      <copy-link value="14">
        <h2>Playing Cards</h2>
      </copy-link>
      <p>The system by which cards are played in the Advanced Game is different from the Basic Game. Each card now has a "<b>Cost</b>" associated with playing it. You must pay the Cost to use the card's effect. Other than Cost, there is no limit to the number of cards you may play. If at any time a player plays a card and then determines they can't afford it, the card is placed on the owning player's Discard Pile. When any contradiction arises between card effects and rules, the card effect supersedes the rules.</p>
      <p>Each card will have a <icon-resource-pool />, <icon-conspiracy-pool /> or <icon-star-pool /> under their <b>Cost</b> value. This indicates from which pool the cost must be paid. <icon-resource-pool /> stands for <b>Resource Pool</b>, <icon-conspiracy-pool /> for <b>Conspiracy Pool</b> and <icon-star-pool /> for either.</p>
      <p>Cards with a <icon-resource-pool /> may only be paid for by the <b>Active Player</b>.</p>
      <p>Cards with a <icon-conspiracy-pool /> Cost may only be paid for by the <b>Conspiracy</b>.</p>
      <p>Cards with a <icon-star-pool /> may be used by either force -- however, whichever force uses it must pay for it. See the <b>Pools</b> section on page <hash-link value="10" /> for further information.</p>
      <p>If a card has multiple effects, indicated by the phrase "Alternately" appearing on the card, the owning player must specify which effect is being used upon playing the card. They may not change to the other effect later.</p>
      <p>In addition, all cards contain <b>Keywords</b> and <b>Activators</b>. These often serve as codes indicating when cards may be played. See the <b>Keywords</b> section on page <hash-link value="17" /> and the <b>Activators</b> section on page <hash-link value="16" /> for further information.</p>
    </rule-page>
    <rule-page page="15">
      <copy-link value="15">
        <h2>Agent Cards</h2>
      </copy-link>
      <p>Agent cards contain a <b>Game Effect</b> in the center of the card. This is a special effect related to the Agent's significance in <b>The X-Files</b> television series. Each of the Agents you selected to begin play may use their Game Effect.</p>
      <p>In addition to your Agents selected at the beginning of the game, you may include additional Agent cards in your Bureau Deck which can be purchased to aid for a single turn. A purchased Agent may contribute as a normal Agent for most of your turn, however their Game Effect is ignored.</p>
      <p>Agents may only be purchased during the <b>Deployment Phase</b>. A purchased Agent is treated as an Active card. When you reach the <b>Debriefing Phase</b>, the Agent is moved to the Discard Pile. You may not use duplicate Agent cards. This means you cannot purchase two of the same Agents in the same turn or purchase an Agent you already have in play.</p>
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <card-image
          :card="agentCard"
          max-width="256"
          class="mx-auto"
        />
        A typical Agent Card
      </v-alert>
    </rule-page>
    <rule-page page="16">
      <copy-link value="16">
        <h2>Activators</h2>
      </copy-link>
      <p>Activators appear in gold in the lower left corner on a particular card. Simply stated, an Activator tells you when you may play a particular card. Activators can be grouped into three main categories:</p>
      <p><b>ACTIVE</b>: May be played while you are the Investigating Player. You may play these cards when it is your turn.</p>
      <p><b>CONSPIRACY</b>: May be played when your are not the Investigating Player. You may play these cards during another player's turn.</p>
      <p><b>All other Activator Words</b>: May be played only in certain circumstances. The Activator tells you where or when a card may be played or what type of card currently in use a card may be played on. Refer to the Keyword on the card in play to determine if you may play your card.</p>
      <p>On an <b>Adversary</b> or <b>Event</b> card, the Activator states what conditions must be met for the card to be used. On an Equipment card, the Activator tells you what section the Agent must be in to Requisition the Equipment.</p>
      <v-alert
        type="info"
        text="All Activators must be in effect in order for the card to be played."
      />
      <p>See the <b>Turn Example: Investigation Phase</b> section on page <hash-link value="27" /> for an example of Activator use.</p>
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <v-item-group>
          <v-item v-slot="{ isSelected, toggle }">
            <div @click="toggle">
              <card-image
                :card="equipmentCard"
                max-width="256"
                :class="[ 'mx-auto transition-transform', { 'transform--rotate-90': isSelected } ]"
              />
            </div>
          </v-item>
        </v-item-group>
        An example of a card's Activators (click to rotate).
      </v-alert>
    </rule-page>
    <rule-page page="17">
      <copy-link value="17">
        <h2>Keywords</h2>
      </copy-link>
      <p><b>Keywords</b> appear in red in the lower left corner on a particular card. The Keyword tells you what a card is.</p>
      <p>Most often, you will check the Keywords on an opponent's card to determine if you have a playable card. If your card's Activators are contained in the other card's Keyword section, you may play your card.</p>
      <v-alert
        variant="tonal"
        color="info"
      >
        <v-item-group>
          <v-item v-slot="{ isSelected, toggle }">
            <div @click="toggle">
              <card-image
                :card="townsendWICard"
                max-width="256"
                :class="[ 'mx-auto transition-transform', { 'transform--rotate-90': isSelected } ]"
              />
            </div>
          </v-item>
        </v-item-group>
        <p class="text-center">
          (click to rotate)
        </p>
        <p>{{ playerOne }} consults his "Townsend, WI" Site card. He discovers the Keywords "<b>SITE</b>", "<b>MULTI</b>", "<b>MOTIVE</b>", "<b>RESULT</b>", "<b>ALIEN INVESTIGATION</b>" and "<b>BUREAUCRACY</b>". From this, {{ playerOne }} determines that the card is a Site with multiple Skills and questions. The Skills which can be used are Alien Investigation or Bureaucracy and the question hey may ask upon a successful investigation is either a RESULT or MOTIVE question.</p>
      </v-alert>
      <p>There are several cards which change another card's Keywords. When this occurs, only the Keyword is changed. The rest of the card remains unchanged.</p>
      <h2>Resources</h2>
      <p>One particular Keyword worth special mentions is "<b>RESOURCE</b>". The Keyword RESOURCE will appear on certain cards. A card with the Keyword "RESOURCE" remains in play in the table section stated by the Keyword on the card. If no table section is indicated on the card, place the card face up in your Bureau section. These cards remain in play until they are negated or the criteria for their removal (if listed on the Resource card) is met. When this occurs, the card is moved to your Discard Pile.</p>
    </rule-page>
    <rule-page page="18">
      <h3>Detailed Advanced Game Phase Descriptions</h3>
      <copy-link
        value="18"
        color="red"
      >
        <h2 class="text-red">
          The Briefing Phase
        </h2>
      </copy-link>
      <p>At the beginning of the Briefing Phase, the Investigating Player may draw one card. This is a "free" draw and occurs regardless of any Agent's current status.</p>
      <p>The Investigating Player may then use his Agents to create <b>Resource Points</b> (RPs or <icon-resource-pool />). Then they may purchase cards. Cards are purchased from the top of the Bureau Deck at the cost of <b>1</b> <icon-resource-pool /> each. The Investigating Player must announce how many cards they are purchasing and do so at one time. They may not purchase some and choose to purchase more later. See the <b>Resource Pool</b> section on page <hash-link value="11" />.</p>
      <p>Any of the Investigating Player's opponents may now discard cards from their hand with an <icon-resource-pool /> or <icon-star-pool /> Cost and gain an equal number of <icon-conspiracy-pool />s. This is optional. Cards that are exchanged are placed face up on the Discard Pile.</p>
      <p>Each opponent of the Investigating Player may purchase cards from the top of the Bureau Deck at the cost of <b>1</b> <icon-conspiracy-pool /> each. Purchasing cards is done after <icon-resource-pool /> cards have been sold. Each player must announce how many cards they are purchasing and do so at one time. They may not purchase some and choose to purchase more later. See the <b>Conspiracy Pool</b> section on page <hash-link value="12" />.</p>
    </rule-page>
    <rule-page page="19">
      <copy-link value="19">
        <h3>Turn Example: Briefing Phase</h3>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
      >
        <p>{{ playerOne }} begins his turn with the Briefing Phase. He draws one card as a "free" draw. He uses his Agents' Resource (RES) numbers to create <icon-resource-pool />s. Scully and Mulder both have a RES number of 2 and Kosseff and Lamana both have the RES number 1. {{ playerOne }} would add all six tokens to his Resource Pool, however Mulder's Game Effect is that the <icon-resource-pool />s he generates must be used to purchase cards. Therefore, {{ playerOne }} spends <b>2</b> <icon-resource-pool />s and draws two cards. He could have chose to purchase more if desired. {{ playerOne }} has ten cards in his hand and nine tokens in his Resource Pool.</p>
        <p>{{ playerTwo }} now has the chance to gain <icon-conspiracy-pool />s. {{ playerTwo }} may exchange cards with an <icon-resource-pool /> or <icon-star-pool /> value for an equal number of <icon-conspiracy-pool />s. {{ playerTwo }} trades in a Shotgun Equipment card, a Deep Throat Event card, and an Ambush Combat card. The Shotgun card has a <icon-resource-pool /> Cost of <b>6</b>, the Deep Throat card <b>5</b> and the Ambush card <b>2</b>. {{ playerTwo }} adds <b>13</b> <icon-conspiracy-pool /> to his Conspiracy Pool. {{ playerTwo }} now has <b>18</b> <icon-conspiracy-pool /> in his Conspiracy Pool. {{ playerTwo }} purchases 2 cards from the top of his Bureau Deck for <b>1</b> <icon-conspiracy-pool /> each. {{ playerTwo }} has <b>16</b> <icon-conspiracy-pool /> in his Conspiracy Pool after purchasing cards.</p>
      </v-alert>
    </rule-page>
    <rule-page page="20">
      <h3>Detailed Advanced Game Phase Descriptions continued…</h3>
      <copy-link
        value="20"
        color="red"
      >
        <h2 class="text-red">
          The Healing Phase
        </h2>
      </copy-link>
      <p>During this phase, Agents with damage are allowed to recover HEALTH points. Only Agents in the Hospital may heal during this phase. Healing works as follows:</p>
      <ul>
        <li>
          <b>Agents with a permanent HEALTH rating of 3 or less:</b><br>
          Heal 1 point of damage now.
        </li>
        <li>
          <b>Agents with a permanent HEALTH rating of 4 or higher:</b><br>
          Heal 2 points of damage now.
        </li>
      </ul>
      <p>Only Agents with a current HEALTH rating of 3 or higher after the Healing Phase are allowed to leave the Hospital during the Deployment Phase. This is true regardless of whether the trip to the Hospital was voluntary or a forced result of Combat. In the Event that an Agent has a permanent HEALTH Rating of less than 3, then the Agent may leave the Hospital when fully healed.</p>
      <p>Agents in the Hospital may not contribute their Skills to any Skill Checks.</p>
      <p>The permanent HEALTH Rating is the <b>HEALTH</b> listed on upper right of the Agent card.</p>
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <card-image
          :card="agentCard"
          max-width="256"
          class="mx-auto"
        />
        A typical Agent HEALTH Rating.
      </v-alert>
    </rule-page>
    <rule-page page="21">
      <copy-link
        value="21"
        color="red"
      >
        <h2 class="text-red">
          The Requisition Phase
        </h2>
      </copy-link>
      <p>FBI Agents have access to an assortment of Equipment to aid in the investigation. To obtain Equipment, Agents must Requisition it. All Equipment cards state the requirements for Requisition in their Activators. Frequently, the Agent will need to be in the Bureau to get Equipment.</p>
      <p>The Investigating Player may pay for and assign Equipment to any Agent who meets the requirement on the Equipment card. Furthermore, Agents in the same Team (please see <b>Teams</b> on page <hash-link value="23" />) are allowed to exchange Equipment during this phase. Agents may not have more than one of any particular item, but may have as many total pieces of different Equipment as they wish. Also, an Agent may only use one piece of Equipment to modify a single Skill Check.</p>
      <p><b>Example:</b></p>
      <v-alert
        variant="tonal"
        color="info"
      >
        {{ playerOne }} has Scully in the field. In Long Range Combat she has two weapons, one which adds 3 to her LRC and one which adds 2. {{ playerOne }} may not have her use both at once. He must choose one weapon. Naturally, he chooses the one which does more damage.
      </v-alert>
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <div class="d-flex justify-center ga-2">
          <card-image
            :card="glock19Card"
            :max-width="threeCardWidth"
          />
          <card-image
            :card="scullyCard"
            :max-width="threeCardWidth"
          />
          <card-image
            :card="shotgunCard"
            :max-width="threeCardWidth"
          />
        </div>
      </v-alert>
    </rule-page>
    <rule-page page="22">
      <copy-link value="22">
        <h3>Turn Example: Healing and Requisition Phases</h3>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
      >
        <p>{{ playerOne }} now enters the Healing Phase. Since this is his first turn, no Healing will occur or is needed.</p>
        <p>Let's assume that Agent Mulder has taken 5 damage and Agent Kosseff 3. Both Agents are moved to the Hospital since their HEALTH ratings have been reduced to 0. {{ playerOne }} has placed five tokens on Mulder and three on Kosseff. He does this to show that Mulder has taken all 5 points of his HEALTH in damage and Kosseff has taken all 3 of hers as well. During the Healing Phase, {{ playerOne }} removes two tokens from Mulder's card because this permanent HEALTH rating is 4+. He also removes one token from Kosseff's card because her permanent HEALTH rating is 3 or less. Neither Agent may leave the Hospital this turn, as they must heave at least 3 HEALTH to do so. The Healing Phase is completed.</p>
        <p>Remember in our turn example, no one is actually hurt or in the Hospital yet.</p>
        <p>{{ playerOne }} now begins his Requisition Phase. {{ playerOne }} has a "Knife" card in his hand. The "Knife" adds 1 to the Agent's CRC skill. This Equipment card has the Activator word "<b>BUREAU</b>". Since all of {{ playerOne }}'s Agents began the game in the Bureau, he may pay for and assign the Equipment card to any of his Agents. {{ playerOne }} removes the <b>2</b> <icon-resource-pool /> Cost from his Resource Pool and places the Equipment card with Agent Mulder. {{ playerOne }} now has <b>7</b> <icon-resource-pool />s left in his Resource Pool. {{ playerOne }} does not want to Requisition any more Equipment and has completed the Requisition Phase.</p>
      </v-alert>
    </rule-page>
    <rule-page page="23">
      <copy-link
        value="23"
        color="red"
      >
        <h2 class="text-red">
          The Deployment Phase
        </h2>
      </copy-link>
      <p>During the Deployment Phase, each FBI Agent is sent to the location where they will be carrying out actions. All Agents may be moved to the desired location; the <b>Bureau</b>, the <b>Field</b> or the <b>Hospital</b>. An Agent in the Hospital who is not eligible to leave may not be moved.</p>
      <p>Agents must be in the Field in order to participate in a Site Investigation during the <b>Investigation Phase</b>.</p>
      <h2>Teams</h2>
      <p>During this phase, you may designate new <b>Agent Teams</b>. An Agent Team is simply a group of one or more Agents. This group may be any number. You may designate more than one Team in the same Section if you choose. One instance where you would designate more than one Team in the same Section would be if you wanted to investigate two Sites in one turn. In this instance, you would create two Teams in the Field section. You will also have the opportunity to designate new Teams in the Field Section at the beginning of the Investigation Phase. Any single Agent may not be part of more than one Team at a time. If new Teams are not designated, it is assumed that the most recent Team designations still apply.</p>
    </rule-page>
    <rule-page page="24">
      <h3>Advanced Game Phase Descriptions continued…</h3>
      <copy-link
        value="24"
        color="red"
      >
        <h2 class="text-red">
          The Case Assignment Phase
        </h2>
      </copy-link>
      <p>At the beginning of the Case Assignment Phase, the Investigating Player places all Sites in the Field Section that he might investigate. The Investigating Player must also pay the Cost listed on the Site card at the this time. Note that a Site being placed on the table doesn't necessarily mean that the player must ever investigate that Site.</p>
      <p>All opponents may assign Bluffs to any and/or all Sites played by the Investigating Player at this time. See the <b>Bluff</b> section on the following page.</p>
      <p>Sites played by the Investigating Player but not investigated during the Investigation Phase are moved to the Discard Pile at the end of the turn unless a Bluff is placed under the Site.</p>
      <p>Some Site cards give you a choice between two Prerequisite skills you may use. You must announce which Skill you will be using prior to investigating the Site. Once you announce which Skill you are using, you may not change to the other.</p>
      <p>If you have two identical Sites in your hand, you may not use them both in the same turn.</p>
    </rule-page>
    <rule-page page="25">
      <copy-link value="25">
        <h2>The Bluff</h2>
      </copy-link>
      <p>Bluff cards contain the Keyword "<b>Bluff</b>" and typically hinder an investigation. Cards with the Keyword "BLUFF" may be played in two ways.</p>
      <ol>
        <li>Cards with the Keyword "BLUFF" may be placed face down beneath a Site during the <b>Case Assignment</b> Phase by any player except the Investigating Player. Bluff cards played beneath a Site may be purchased for <b>1</b> <icon-conspiracy-pool /> less then the Bluff card's stated Cost. The Cost is paid when the Site investigation is attempted. A Cost can never be less than 0. You cannot gain tokens as a result of playing a Bluff card with 0 Cost.</li>
        <li>Cards with the Keyword "BLUFF" may be played as normal Conspiracy cards at full Cost.</li>
      </ol>
      <p>Bluffs are designed to make the Investigating Player think twice about the chance of successful investigation. Any card may be placed face down underneath the Site. These cards do not actually have to be Keyword "BLUFF" cards (non-Bluffs played as a Bluff are revealed and discarded upon Site investigation). They may in effect be "bluff" Bluffs. Cards placed under a Site as a Bluff remain there until the Site is investigated.</p>
      <p>When a Site with a Bluff is investigated, the card is revealed immediately. All cards placed as Bluffs are revealed, regardless of whether or not they contain the Keyword "BLUFF". If a card placed beneath a Site does not contain the Keyword "BLUFF", the owning player cannot afford to pay for the Bluff, or the owning player does not want to use the Bluff, the card is discarded.</p>
      <p>If the Site is not investigated this turn, the Site will remain in play with the Bluff underneath it until an investigation is attempted or the game ends. An Agent Team that investigates a Site with Bluffs beneath it "activates" these Bluffs. They are referred to as the <b>Activating Team</b>.</p>
    </rule-page>
    <rule-page page="26">
      <copy-link value="26">
        <h3>Turn Example: Deployment and Case Assignment Phases</h3>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
      >
        <p>{{ playerOne }} has now reached the Deployment Phase. All of {{ playerOne }}'s Agents are currently in the Bureau. {{ playerOne }} moves Agents Mulder, Scully, and Kosseff from the Bureau to the Field. {{ playerOne }} leaves Jerry Lamana in the Bureau. The Deployment Phase is now completed.</p>
        <p>The Case Assignment Phase is next. {{ playerOne }} places the Site "Aubrey, MO" in the Field section of the table and pays the <b>2</b> <icon-resource-pool /> Cost indicated on the Site card. {{ playerOne }} now has <b>5</b> <icon-resource-pool />s left in his Resource Pool. The "Aubrey, MO" card has a Prerequisite of BEHAVIORAL 4+. This means that {{ playerOne }}'s Agents investigating the Site must have 4 of more BEHAVIORAL skill in order to ask a question about {{ playerTwo }}'s X-File. Since {{ playerOne }} and {{ playerTwo }} are playing a two-player game, {{ playerTwo }} is the Directed Player by default. In a multi-player game, {{ playerOne }} would have to announce which player the Site is directed toward. {{ playerTwo }} places two Bluffs beneath the Site. The Bluffs will not be revealed or paid for until the Site is actually investigated. The Case Assignment Phase is completed.</p>
      </v-alert>
    </rule-page>
    <rule-page page="27">
      <copy-link
        value="27"
        color="red"
      >
        <h2 class="text-red">
          The Investigation Phase
        </h2>
      </copy-link>
      <p>The Investigating Player must allocate all Agents currently in the Field to the Site(s) they plan to investigate. The Investigating Player does not have to investigate a Site card. New Teams may now be formed in the Field section only. See the <b>Deployment Phase</b> rules on page <hash-link value="23" /> for more information on forming Agent Teams.</p>
      <p>Generally, Agents may not participate in more than one Site investigation per turn. An Agent does not necessarily have to participate in any investigations while in the Field. Often the player will choose to investigate only one Site, however multiple or no Sites are permissible.</p>
      <p>Each Site investigated is resolved separately. If more than one Site is being investigated, the Investigating Player chooses the resolution order.</p>
      <p>Begin a Skill Check Subroutine for the Site Prerequisite. See the <b>Skill Check Subroutine</b> section of these rules on the following page for further information.</p>
      <v-alert
        type="info"
        text="A particular Site may only be investigated by one Agent team during a single turn."
      />
      <v-alert
        type="info"
        text="In order to successfully investigate a Site, at least one Agent must be there."
      />
    </rule-page>
    <rule-page page="28">
      <copy-link value="28">
        <h2>Advanced Phase Descriptions continued…</h2>
      </copy-link>
      <p>
        <b>Skill Check Subroutine</b><br>
        Whenever a Skill Check is initiated, perform a Skill Check Subroutine. The Skill Check Subroutine proceeds as follows:
      </p>
      <ol class="list-style-type--lower-alpha">
        <li>Announce to your opponent the Skill being used, the amount needed, and the Skill level currently possessed by the Agent Team.</li>
        <li>Each Player may pay for and play cards.</li>
      </ol>
      <p>The current Skill level may now be modified by cards played by each player attempting to successfully complete or foil the Skill Check. The Active Player has the option to pay for and play the first card. After this, cards may be bought and played by any player. Cards must be paid for from the appropriate pool by the player who owns the card. See the <b>Pools</b> section on page <hash-link value="10" /> for further information.</p>
      <p>Multiple cards may be played prior to one card being resolved. In these instances, the last card played is resolved first. Cards are played until all players decide to play no more. One type of card which can be played is an Adversary card. These cards result in Combat. See the <b>Combat</b> section on page <hash-link value="31" /> for further information.</p>
      <p>After a card is used, place it face up on your Discard Pile. Playing a card may initiate a new Skill Check Subroutine. If this occurs, resolve this new Skill Check before resolving the original Skill Check.</p>
      <p>Certain cards may have lasting effects. This will be noted on the individual card.</p>
    </rule-page>
    <rule-page page="29">
      <ol
        start="3"
        class="list-style-type--lower-alpha"
      >
        <li>Resolve the Skill Check.</li>
      </ol>
      <p>If the Agent Team successfully meets the Skill level needed after all card effects and any additional Skill Check Subroutines have been resolved, then the appropriate effect is applied. This ends the Skill Check Subroutine.</p>
      <v-alert variant="tonal">
        There are two special cases when exceptions to the Skill Check Subroutine process occur. The first is during a Site investigation. During a Site investigation, Bluffs placed beneath a Site are revealed and resolved before any cards are played in step 2. See the <b>Bluff</b> section on page <hash-link value="25" /> for information on resolving Bluffs.
      </v-alert>
      <v-alert variant="tonal">
        The second special case is during Combat. In Combat, repeat the Skill Check Subroutine process by conducting additional Combat rounds until the Adversary's HEALTH has been reduced to 0 or all Agents have been sent to the Hospital. Also, only Combat cards may be played during a Combat Skill Check Subroutine. See the <b>Combat</b> section on page <hash-link value="31" /> for further information.
      </v-alert>
      <v-divider />
      <v-alert
        type="info"
        text="Cards may be played during a Skill Check Subroutine initiating an additional Skill Check. When this occurs, the current Skill Check Subroutine is put on hold and another Skill Check Subroutine is initiated for the new Skill Check. Also, two of the same card can't be used for the same Skill Check Subroutine; i.e., two of the same Witness on the same Skill Check."
      />
    </rule-page>
    <rule-page page="30">
      <copy-link value="30">
        <h3>Turn Example: Investigation Phase</h3>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
      >
        <p>The Investigation Phase is the next phase in {{ playerOne }}'s turn. {{ playerOne }} chooses to investigate "Aubrey, MO" with all three Agents as a Team in the Field. {{ playerOne }} currently has a BEHAVIORAL skill level of 7 (Mulder 3, Kosseff 3, Scully 1). The Bluffs {{ playerTwo }} placed beneath the Site are now immediately revealed. {{ playerTwo }}'s first Bluff is the "Car Troubles" card. This card forces {{ playerOne }} to investigate with only two Agents. {{ playerOne }} chooses to leave Scully behind, as she is only contributing 1 to the Site Prerequisite. {{ playerTwo }} pays <b>2</b> <icon-conspiracy-pool /> for the Bluff. The actual Bluff Cost is 3, but Bluffs played face down in the Case Assignment Phase Cost <b>1</b> <icon-conspiracy-pool /> less. {{ playerTwo }} now has <b>14</b> <icon-conspiracy-pool /> in his Conspiracy Pool. {{ playerTwo }}'s second Bluff is not an actual Bluff. {{ playerTwo }} placed the Site card "Cape Cod, MA" underneath the Site to discourage {{ playerOne }} from investigating it. The Site card played as a Bluff is moved to {{ playerTwo }}'s Discard Pile.</p>
        <p>{{ playerOne }} now has a BEHAVIORAL skill level of 6 (Mulder 3, Kosseff 3). {{ playerTwo }} does not want {{ playerOne }} to ask a question, so he plays the Adversary card "The Manitou Stalks His Prey". The Manitou card contains the Activators "<b>CONSPIRACY</b>" and "<b>MOTIVE SITE</b>". Since it is not {{ playerTwo }}'s turn, the "<b>CONSPIRACY</b>" condition is satisfied. The "<b>MOTIVE SITE</b>" condition is also satisfied because the "Aubrey, MO" Site contains this Keyword. {{ playerTwo }} may play the Adversary card. {{ playerTwo }} pays the <b>6</b> <icon-conspiracy-pool /> Cost and now has <b>8</b> <icon-conspiracy-pool /> left in his Conspiracy Pool. {{ playerOne }} immediately plays his Event card "X" which negates one Adversary. {{ playerOne }} pays the <b>3</b> <icon-resource-pool /> Cost and now has <b>2</b> <icon-resource-pool /> left in his Resource Pool.</p>
        <p>With {{ playerOne }} still meeting the Site Prerequisite, {{ playerTwo }} decides to play another Adversary. {{ playerTwo }} plays his "Good People, Good Food" card for <b>8</b> <icon-conspiracy-pool />. {{ playerTwo }} now has <b>0</b> <icon-conspiracy-pool /> in his Conspiracy Pool. {{ playerOne }} cannot negate this card and Combat is initiated.</p>
      </v-alert>
    </rule-page>
    <rule-page page="31">
      <copy-link value="31">
        <h2>Combat</h2>
      </copy-link>
      <p>When you encounter an Adversary which is not negated, Combat will follow. Unless an opponent plays a card which specifically allows him to do so, only one Adversary may be encountered at a time. Therefore, if opponents want to play more than one Adversary, each is resolved during a separate Combat.</p>
      <p>Combat typically occurs in two rounds. The first round is <b>Long Range Combat (LRC)</b> and the second is <b>Close Range Combat (CRC)</b>. Only one round of Long Range Combat occurs. After Long Range Combat, Close Range Combat rounds are repeated until the Adversary is killed or all Agents are sent to the Hospital. All damage inflicted during each round occurs simultaneously. Thus, it is possible for an Agent or Adversary to be removed by Combat and still inflict damage for that round.</p>
    </rule-page>
    <rule-page page="32">
      <copy-link value="32">
        <h2>Long Range Combat</h2>
      </copy-link>
      <p>Combat typically starts with <b>Long Range Combat (LRC)</b>. Some Adversaries will attack by surprise or other special method involving the skipping of Long Range Combat, but this wil be stated on the specific card.</p>
      <p>Long Range Combat skill is listed on Adversary and Agent cards. A <b>Skill Check Subroutine</b> must be initiated to determine the damage done by the Agents and Adversary. See the Skill Check Subroutine section on page <hash-link value="28" /> of these rules. Add up all combatant's LRC numbers to determine the amount of damage done. Combat cards are now played and their effect added. See the Combat Card section of these rules on page <hash-link value="35" /> for further information. Also, add the modifiers of any Equipment which adds to Long Range Combat.</p>
      <p>Damage inflicted by Agents may be applied separately if there are multiple targets, however, each particular Agent's damage cannot be split. Damage inflicted by a single Adversary on an Agent Team is allocated to one Agent. Each player decides which opponent will receive the inflicted damage.</p>
      <p>An Agent is moved to the Hospital when his HEALTH rating has been reduced to 0. Any reduction that results in a negative HEALTH rating for an Agent is considered to be HEALTH rating 0. No negative HEALTH ratings occur. An Adversary is killed (and discarded) when its HEALTH rating has been reduced to 0. Some Adversaries will not have Long Range Combat ability, noted by an <b>N/A</b> listed as its LRC.</p>
      <p>If the Adversary has been killed or if all Agents have been sent to the Hospital, Combat ends. If not, Combat continues with <b>Close Range Combat</b> rounds.</p>
    </rule-page>
    <rule-page page="33">
      <copy-link value="33">
        <h2>Close Range Combat</h2>
      </copy-link>
      <p><b>Close Range Combat (CRC)</b> follows the Long Range Combat round. Close Range Combat skill is listed on Adversary and Agent cards. Again, both players may use Combat cards. See the Combat Card section on page <hash-link value="35" /> of these rules. A Skill Check Subroutine again must be initiated to determine damage done by both the Adversary and the Agents. See the Skill Check Subroutine section on page <hash-link value="28" /> of these rules. Add on the effects of any Combat cards. Also, add the modifiers of any Equipment which adds to Close Range Combat. Apply the results in the same manner as Long Range Combat.</p>
      <p>When all Agents are sent to the Hospital or de Adversary's HEALTH is reduced to 0, Combat ends. Regardless of the outcome of Combat, the Adversary card is placed on the owning player's Discard Pile after Combat completion. If Combat has not yet been resolved, repeat Close Range Combat rounds until the Adversary is killed or all Agents have been sent to the Hospital.</p>
      <v-alert type="info">
        An Agent with HEALTH greater than 0 may stay in the Field and is not obligated to go to the Hospital unless a card effect states otherwise. If they choose to go to the Hospital, they may not leave until they have at least 3 HEALTH or are fully healed. See the Healing Phase section on page <hash-link value="20" /> for more information.
      </v-alert>
      <v-alert
        type="info"
        text="Witness with HEALTH are treated as Agents in Combat rounds. Thus, Combat cards may be used on a Witness with HEALTH. If a Witness's HEALTH is reduced to 0, move the Witness card to the owning player's Discard Pile."
      />
    </rule-page>
    <rule-page page="34">
      <copy-link value="34">
        <h2>Tracking Damage</h2>
      </copy-link>
      <p>In order to keep track of damage, you will need some sort of token. This may be as simple as pennies added for each damage point received or removed for each point healed.</p>
      <p>One method is the use of six-sided dice. For example, Agent Mulder (HEALTH rating 5) received 3 damage in Combat. Place a six-sided die on his card with the 3 facing upward. This symbolizes that he has taken 3 damage and has 2 HEALTH left. Now, assume he takes another three points damage. Mulder has taken a total of 6 points of damage. Since an Agent's HEALTH cannot drop below 0, Mulder now has 0 HEALTH.</p>
      <p>Mulder is immediately moved to the Hospital and may not contribute his skills to any Skill Checks. Place the 5 facing upward. This symbolizes that he needs to recover 5 HEALTH to be at full strength. During the next turn, the die is changed to show 3 facing upward symbolizing the healing of two points, a current HEALTH rating of 2, but three points needed to be healed to Mulder to have full HEALTH. If Mulder leaves prior to having full HEALTH (remember that he must have a minimum of 3 HEALTH to leave), the die indicating his current damage sustained remains on the Agent card.</p>
      <p>Another effective method is the use of tokens, for example, pennies. Place a penny on the Agent's card for each point of damage they have received. These pennies are similarly removed as an Agent heals in the Hospital. Experiment and use whichever method you find most convenient.</p>
    </rule-page>
    <rule-page page="35">
      <copy-link value="35">
        <h2>Combat Cards</h2>
      </copy-link>
      <p>Combat cards may be paid for and played during both the Long Range Combat and Close Range Combat rounds and typically enhance or reduce the damage done. Some Combat Cards will have a <icon-star-pool /> next to the cost number instead of a <icon-resource-pool /> or <icon-conspiracy-pool />. This denotes that either the Conspiracy or Active Player may use these cards. The card must be paid for by whomever uses it (Active Player or Conspiracy).</p>
      <p>Each player may use as many Combat cards as they like, provided their Cost is paid.</p>
      <v-alert
        type="info"
        text="Combat cards are the only cards that can be played in a Combat Skill Check Subroutine."
      />
      <p>The player who played the Adversary has the option to pay for and play the first Combat card. After this, any player may pay for and play Combat cards. Combat cards are resolved on a last-played/first-resolved basis. The results are then applied to the specific Combat round.</p>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="combatCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="36">
      <copy-link value="36">
        <h3>Turn Example: Combat</h3>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
      >
        <p>Combat begins with one Long Range Combat round. The Adversary "Good People, Good Food" has no LRC Skill and thus does no damage during this round. Mulder has 2 LRC Skill and Kosseff has 1 LRC Skill. Neither player chooses to play Combat cards. The Agents inflict 3 damage during the Long Range Combat round. {{ playerTwo }} places three tokens on the Adversary card, denoting the 3 damage done.</p>
        <p>Combat proceeds to the Close Range Combat round. Close Range rounds will be repeated until all Agents are sent to the Hospital or the Adversary has been killed. In Close Range Combat Mulder has 2 CRC and Kosseff has 1 CRC. Mulder also has the "Knife" he Requisitioned earlier which adds +1 to CRC. The Agents have done an additional 4 damage for a cumulative total of 7. The Adversary does 3 Damage. {{ playerTwo }} assigns the 3 damage to Kosseff, resulting in her having 0 HEALTH. {{ playerOne }} immediately plays a Combat card. It is the "First Aid" card which immediately heals 1 point damage at the Cost of 0 <icon-resource-pool />. {{ playerOne }} uses this to add 1 HEALTH to Agent Kosseff and prevent her from having to go to the Hospital. The Adversary now has 3 HEALTH left and Kosseff has 1 HEALTH remaining.</p>
        <p>Another round of Close Range Combat occurs. {{ playerOne }}'s Agents do an additional 4 damage and the Adversary's HEALTH is exceeded. The Adversary card is moved to {{ playerTwo }}'s Discard Pile. The Adversary still does its 3 damage. {{ playerTwo }} assign the damage to Kosseff, who now has HEALTH 0 and is immediately moved to the Hospital with three tokens placed on her card.</p>
      </v-alert>
    </rule-page>
    <rule-page page="37">
      <copy-link
        value="37"
        color="red"
      >
        <h2 class="text-red">
          Site Resolution
        </h2>
      </copy-link>
      <p>If the investigating Agent Team still successfully meets the Site prerequisite after all cards have been played and resolved, they may ask the Directed Player a specific X-File Characteristic question as stated on the Site card. The opposing player must be able to answer this question with either a "yes" or a "no" answer. The Investigating Player may also choose to guess the opponent's X-File identity as well. If the identity guess is correct, the Investigating Player has won the game. If the guess is incorrect, a penalty is assessed. The penalty is that the player whose X-File was incorrectly identified may now ask a question of the Investigating Player. This question may be a specific characteristic question as indicated on the Site card just solved, or a guess of the Investigating Player's X-File identity. If the player guesses incorrectly, there is not penalty. After all questions have been asked, the Site card is moved to the Discard Pile.</p>
      <p>Examples of appropriate questions are: <i>"Is your X-File's AFFILIATION Alien?"</i>, <i>"Is your X-File's METHOD Violence?"</i> or <i>"Is your X-File's RESULT Death?"</i> You may not ask questions like <i>"What is your AFFILIATION?"</i> or <i>"Is your AFFILIATION six letters or less?"</i></p>
      <p>If the Site Prerequisite has not been met, the Site card is placed on the Discard Pile. After all investigated Sites have been resolved, any remaining Sites with no Bluffs under them are moved to the Discard Pile. Any remaining Sites with Bluffs under them remain in the Field section until they are investigated during a later turn or the game ends. Sites may only be investigated by the player who played the Site.</p>
      <p>If a player chooses not to investigate any Sites for a particular turn, all players may still pay for and play any applicable cards.</p>
    </rule-page>
    <rule-page page="38">
      <copy-link
        value="38"
        color="red"
      >
        <h2 class="text-red">
          The Debriefing Phase
        </h2>
      </copy-link>
      <p>The Debriefing Phase is the final phase in each player's turn. All players may now discard cards. After discarding cards, your hand size must be seven cards or less. If you have more than seven cards, you must discard until no more than seven remain.</p>
      <p>After the Debriefing Phase, the turn is completed. The next player to the left now begins their turn and turn and the turn sequence is repeated.</p>
    </rule-page>
    <rule-page page="39">
      <copy-link value="39">
        <h3>Turn Example: Investigation Phase Conclusion and Debriefing Phase</h3>
      </copy-link>
      <v-alert
        variant="tonal"
        color="info"
      >
        <p>{{ playerOne }} now only has Agent Mulder left with BEHAVIORAL skill 3. The "Aubrey, MO" Site card has a Prerequisite of BEHAVIORAL 4+. {{ playerOne }} now pays 2 <icon-resource-pool /> for the Witness card "Dr. Sheila Braun" which adds 2 to one Behavioral Skill Check. {{ playerOne }} now has 0 <icon-resource-pool /> in his Resource Pool. {{ playerOne }} is out of <icon-resource-pool /> and {{ playerTwo }} is out of <icon-conspiracy-pool /> so both players may not play any more cards. {{ playerOne }}'s Agents have a BEHAVIORAL Skill Level of 5 (Mulder 3, Witness cards 2) and successfully meet the Site Prerequisite of BEHAVIORAL 4+. The "Aubrey, MO" card allows {{ playerOne }} to ask one MOTIVE question. {{ playerOne }} asks {{ playerTwo }} if his X-File's MOTIVE is SURVIVAL. The answer is NO and game play continues. {{ playerOne }} chooses not to guess {{ playerTwo }}'s X-File identity at this time.</p>
        <p>It is now time for the Debriefing Phase. Since {{ playerOne }} and {{ playerTwo }} both have five cards left, neither player needs to discard any cards. {{ playerOne }}'s turn is completed and it is now {{ playerTwo }}'s turn.</p>
      </v-alert>
    </rule-page>
    <rule-page page="40">
      <copy-link value="40">
        <h2>Multi-Player Changes</h2>
      </copy-link>
      <p>In an Advanced Game, there are a few subtle changes that take place when multiple players are involved. This section will address these changes.</p>
      <h3 class="text-decoration-underline">
        Briefing Phase Multi-Player Changes:
      </h3>
      <p>When each player has the opportunity to turn in <icon-resource-pool /> Cost cards to create <icon-conspiracy-pool />s, the player to the Investigating Player's left must do so first. After each player is finished, continue to the next player on the left until all players have had the opportunity to turn in cards.</p>
      <h3 class="text-decoration-underline">
        Case Assignment Phase Multi-Player Changes:
      </h3>
      <p>In a multi-player game, the Investigating player must now announce the specific opponent to which each Site question is directed. This is done by default in a two-player game as there is only one opponent. The Investigating Player may only ask the Site question of one opponent. Once a Site has been directed at a particular opponent, it may not be changed.</p>
    </rule-page>
    <rule-page page="41">
      <h3 class="text-decoration-underline">
        Skill Check Subroutine Multi-Player Changes:
      </h3>
      <p>During a Skill Check Subroutine, all players may pay for and play cards. The Investigating Player may only play cards with an <icon-resource-pool /> or <icon-star-pool /> cost. The Directed Player may only play cards with a <icon-conspiracy-pool /> or <icon-star-pool /> Cost. Other players who are neither the Investigating or Directed Player may play any cards. In the event, <icon-resource-pool /> cards are paid for from the Resource Pool, <icon-conspiracy-pool /> cards are paid for from the Conspiracy Pool, and <icon-star-pool /> cards are paid for from the pool which the card benefits. If the card helps the Agents, it is paid for from the Resource Pool. If a card benefits the Conspiracy, it is paid for from the Conspiracy Pool.</p>
      <h3>Investigation Phase Multi-Player Changes</h3>
      <p>Answers to all Characteristics and Identity questions are given in secrecy.</p>
      <h3 class="text-decoration-underline">
        Card Play:
      </h3>
      <p>In a multi-player game, cards must be paid for by the owning player. Players may not give <icon-conspiracy-pool /> or <icon-resource-pool /> to other players or combine funds to pay for a card.</p>
      <p>&nbsp;</p>
      <p>All other rules apply as in a two-player game.</p>
    </rule-page>
    <rule-page page="42">
      <copy-link
        value="42"
        color="red"
      >
        <h2 class="text-red">
          Optional Rules
        </h2>
      </copy-link>
      <p>The following rules were designed to add fun and intrigue into <b>The X-Files CCG</b> experience. They are not part of the official rules and you may choose to play with any or all of them as desired. In order to use an optional rule, both players must agree. If either player objects, an optional rule may not be used.</p>
      <h2>Game Play and Deck Construction</h2>
      <p>The following two optional rules are designed to make game outcome more centered around game play and deck construction. Both may be used together or separately. These are:</p>
      <ol>
        <li>Upon successfully investigating a Site card, the Investigating Player may ask a Characteristic Question <b>OR</b> guess the opponent's X-File identity…not both.</li>
        <li>A player has only ONE chance to guess the opponent's X-File identity per game. If an incorrect guess is made, your opponent automatically wins.</li>
      </ol>
      <h2>Killer Cards</h2>
      <p>Some cards will have the Keyword "<b>KILLER</b>". These cards can permanently remove Agents from play. For game play, these cards are optional. Both players must agree to use these cards in game play. If either player objects, these cards may not be used. Killer cards can be fun to use, but they can also create serious game play imbalances.</p>
      <p>If you play an X-Files Advanced Game using Killer cards, another way to win the game is added. You can now win the game by permanently removing all opposing Agents from game play. This is still a rare occurrence while using these cards.</p>
    </rule-page>
    <rule-page page="43">
      <copy-link value="43">
        <h2>X-File Powers</h2>
      </copy-link>
      <p>The X-File Powers were designed to add flavor and strategy in selecting an X-File. They are optional. Both players must agree in order to use the X-File Powers in Advanced Game play.</p>
      <p>As your opponent gets closer to identifying your X-File, the X-File gains added powers to thwart the Agents. These powers are based on the specific characteristics your opponent knows. Prior to using any of these powers, the controlling player must announce the specific characteristic of his X-File that allows him to use a power. This might seem redundant in a two-player game, but has significance in a multi-player game, as all players might not have already identified the characteristic. Additionally, you can choose to announce a particular characteristic to all opponents and gain that corresponding special effect. The X-Files power gained with a specific Characteristic being revealed are:</p>
      <h3 class="text-blue-darken-2">
        Affiliation
      </h3>
      <v-list class="mb-4">
        <v-list-item
          title="Alien"
          subtitle="ALIEN Adversaries may be played on any Site."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-ufo-outline"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Evolutionary"
          subtitle="EVOLUTIONARY Adversaries may be played on any Site."
        >
          <template #prepend>
            <v-avatar
              color="blue-darken-2"
              icon="mdi-dna"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Government"
          subtitle="GOVERNMENT Adversaries may be played on any Site."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-bank"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Occult"
          subtitle="OCCULT Adversaries may be played on any Site."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-pentagram"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Primordial"
          subtitle="PRIMORDIAL Adversaries may be played on any Site."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-bug"
              color="blue darken-2"
            />
          </template>
        </v-list-item>
      </v-list>
    </rule-page>
    <rule-page page="44">
      <h3 class="text-purple-darken-2">
        Method
      </h3>
      <v-list class="mb-4">
        <v-list-item title="Manipulation">
          <template #prepend>
            <v-avatar
              icon="mdi-head-cog-outline"
              color="purple-darken-2"
            />
          </template>
          <v-list-item-subtitle>
            You may play <icon-conspiracy-pool /> cost Events for one <icon-conspiracy-pool /> less.
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item
          title="Possession"
          subtitle="Place two tokens on your X-File. Discard a token to force one of your opponent's Agents who was damaged in Combat this turn to attack his own Team immediately. The Agent is under your control and will fight until reduced to 0 HEALTH or Combat ends."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-drama-masks"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Subterfuge"
          subtitle="You may force your opponent to discard one card from his hand (their choice) once per turn during their Healing Phase."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-fingerprint"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Threats"
          subtitle="Place three tokens on your X-File. Discard a token to negate one Witness card played by your opponent."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-alert"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item title="Violence">
          <template #prepend>
            <v-avatar
              icon="mdi-pistol"
              color="purple-darken-2"
            />
          </template>
          <v-list-item-subtitle>
            Place two tokens on your X-File. Discard a token to draw an eligible Adversary card from your Discard Pile and play it immediately for two <icon-conspiracy-pool /> less.
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <h3 class="text-orangetext-darken-2">
        Motive
      </h3>
      <v-list class="mb-4">
        <v-list-item title="Control">
          <template #prepend>
            <v-avatar
              icon="mdi-handcuffs"
              color="orange-darken-2"
            />
          </template>
          <v-list-item-subtitle>
            You may force your opponent to discard one <icon-resource-pool /> once per turn during their Healing Phase.
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item
          title="Ideology"
          subtitle="Once per turn you may change one Keyword on a card to any other Keyword."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-pillar"
              color="orange-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Knowledge"
          subtitle="Place two tokens on your X-File. Discard a token to examine your opponent's hand immediately after drawing cards in the Briefing Phase."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-book-open-variant"
              color="orange-darken-2"
            />
          </template>
        </v-list-item>
      </v-list>
    </rule-page>
    <rule-page page="45">
      <v-list class="mb-4">
        <v-list-item title="Security">
          <template #prepend>
            <v-avatar
              icon="mdi-lock"
              color="orange-darken-2"
            />
          </template>
          <v-list-item-subtitle>
            You may play BLUFF cards for one <icon-conspiracy-pool /> less. Note that this will now be two <icon-conspiracy-pool /> less if the Bluff is placed under a Site. A Bluff can be free, but you can never gain tokens by playing a card.
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item
          title="Survival"
          subtitle="Place one damage token on any one of your opponent's Agents (your choice) once per turn during the Healing Phase. The same Agent may not be damaged on consecutive turns."
        >
          <template #prepend>
            <v-avatar color="orange-darken-2">
              <v-icon
                icon="mdi-hospital"
                color="white"
                size="large"
              />
            </v-avatar>
          </template>
        </v-list-item>
      </v-list>
      <h3 class="text-light-green-darken-2">
        Result
      </h3>
      <v-list class="mb-4">
        <v-list-item
          title="Abduction"
          subtitle="Place two tokens on your X-File. Discard one token to Abduct one Agent of your choice. The Agent is placed face up ten cards down in the owning player's Bureau Deck. When the last card covering the Agent is drawn, the Agent is immediately moved to the Hospital (undamaged)."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-van-utility"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Death"
          subtitle="You may play one Combat card on an Adversary you control for free once per Combat."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-skull"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Insanity"
          subtitle="Every Witness played by your opponent's Teams inflicts one point of damage to one Agent in that Team (opponent's choice)."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-brain"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item title="Manipulation of Evidence">
          <template #prepend>
            <v-avatar
              icon="mdi-puzzle"
              color="light-green-darken-2"
            />
          </template>
          <v-list-item-subtitle>
            Your opponent must pay one extra <icon-resource-pool /> for each Site card they play.
          </v-list-item-subtitle>
        </v-list-item>
        <v-list-item title="Physiological Imbalance">
          <template #prepend>
            <v-avatar
              icon="mdi-pulse"
              color="light-green-darken-2"
            />
          </template>
          <v-list-item-subtitle>
            Place three tokens on your X-File. Discard a token to apply a <b>-2</b> modifier to any one Agent's Skill Check. You may do this once per turn.
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </rule-page>
    <rule-page page="46">
      <copy-link value="46">
        <h2>Deck Construction</h2>
      </copy-link>
      <p>This following is a brief section on deck construction to help get you started with building your Bureau Deck. Remember, you may not use more than two of any particular card.</p>
      <p>The first card to include, and possibly most important, is the Site card. These cards are important, as Agents need to ask questions about the opposing X-File in order to win the game. In a deck of sixty cards, you will probably want to include at least fifteen Site cards. Site cards should be about one quarter of your deck. They should also be coordinated around your Agents' strengths. Your Agent Team will have some skills with a total much larger than others. The Bureau Deck should have a proportionally large number of Site cards that utilize these skills.</p>
      <p>All other cards fit into two basic categories: (1) Cards that help you. (2) Cards that hinder your opponents. The mix should center around your personal strategy or play style.</p>
      <p><b>Cards that help you</b>: These cards include Witnesses, Events, Combat Cards and Agents. Events have varied effects. Your will probably want more of these than any other card type. Witnesses usually add to a Skill Check. Combat Cards aid in Combat situations. You will probably want about an even number of these two cards but less of these than Event cards. In the Advanced Game, Agents can also be included in your deck to aid during one turn. While helpful, they tend to be expensive and you will probably only be able to utilize a few.</p>
    </rule-page>
    <rule-page page="47">
      <p><b>Cards that hinder your opponent</b>: These cards include Events, Adversaries, Bluffs and Combat Cards. Again, you will probably want to include more Events than any other card type. Adversaries affect opponents by inflicting damage during Combat and sending them to the Hospital where they cannot contribute to a Skill Check. Bluffs normally subtract from a Skill Check outright. At this point, you will likely need to decide the main way that you want to hinder your opponent. This can be through Adversary of Bluff cards. Whichever you choose, you will likely want more of these than the other. Combat cards can be used to increase the power of Adversaries.</p>
      <p>The final consideration is the Cost to play your cards. It is not wise to have many powerful cards if you cannot afford to play them. The proper combination of more expansive cards and less expansive cards will prove to be the most effective.</p>
      <h3>Sample Deck Quantities, by Suit (60 total):</h3>
      <v-table class="mb-4">
        <tbody>
          <tr>
            <td>Sites</td>
            <td>15</td>
            <td>Events</td>
            <td>15</td>
          </tr>
          <tr>
            <td>Adversaries</td>
            <td>7</td>
            <td>Witnesses</td>
            <td>6</td>
          </tr>
          <tr>
            <td>Bluffs</td>
            <td>6</td>
            <td>Combat</td>
            <td>5</td>
          </tr>
          <tr>
            <td>Equipment</td>
            <td>5</td>
            <td>Agents</td>
            <td>1</td>
          </tr>
        </tbody>
      </v-table>
    </rule-page>
    <rule-page page="48">
      <copy-link value="48">
        <h2>The Nine Different Suits</h2>
      </copy-link>
      <p>The X-Files cards are divided into nine basic suits based on how the card is used in the game. Before going further, it is important to note that many cards will appear to "break" rules defined in the Basic or Advanced Game. When any contradiction arises between card effects and rules, the card effect supersedes the rules. Most of the information contained on a card is common to all cards.</p>
      <p>Common Information on All Cards</p>
      <ol>
        <li>The <b>Name</b> of the card.</li>
        <li>The <b>Card Type</b>: Indicates the card's function within the game.</li>
        <li>The <b>Advanced Indicator</b>: If there is a yellow-green "X" here, it denotes that the card is used only in the Advanced Game.</li>
        <li>The <b>Card Number</b>: A unique identifier for each card in the set.</li>
        <li>The <b>Activators</b>: Indicates when this card may be played.</li>
        <li>The <b>Keywords</b>: Indicates what type of cards may be used against the particular card.</li>
        <li>The <b>Game Effect</b>: Explains the effect of this card when played.</li>
        <li>The <b>Card Cost</b>: Indicates the amount it will cost in Resource Points (<icon-resource-pool />), Conspiracy Points (<icon-conspiracy-pool />) or either (<icon-star-pool />) to play the card from a hand in an Advanced Game.</li>
        <li>The <b>Story Line</b>: Consists of a brief quote or phrase relating to the subject of the card, taken from <b>The X-Files</b> television series.</li>
      </ol>
    </rule-page>
    <rule-page page="49">
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <card-image
          :card="typicalCard"
          max-width="256"
          class="mx-auto"
        />
        A typical game card
      </v-alert>
    </rule-page>
    <rule-page page="50">
      <copy-link value="50">
        <h2>Event Cards</h2>
      </copy-link>
      <p>Some Event cards hinder your opponent's Agents in the pursuit of the truth: your X-File's identity. Others help your Agents complete their mission. These cards contain only the common information listed on page <hash-link value="48" />.</p>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="eventCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="51">
      <copy-link value="51">
        <h2>Witness Cards</h2>
      </copy-link>
      <p>Witness cards help Agents investigate Sites and usually modify Skill Checks. Witness cards are said to be unique. This means that only one of each specific card may be applied in a single Skill Check. These cards contain only the common information listed on page <hash-link value="48" />.</p>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="witnessCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="52">
      <copy-link value="52">
        <h2>Bluff Cards</h2>
      </copy-link>
      <p>Bluff cards help deter your opponents from successful Site investigation, usually by subtracting from Skill Checks. In the Basic Game, they are played during the Investigation Phase. Additionally, in the Advanced Game, they may be placed beneath the Site during the Case Assignment Phase. These cards contain only the common information listed on page <hash-link value="48" />.</p>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="bluffCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="53">
      <copy-link value="53">
        <h2>Equipment Cards</h2>
      </copy-link>
      <p>Equipment cards help Agents by permanently modifying a Skill as long as the Equipment is possessed. These cards contain only the common information listed on page <hash-link value="48" />.</p>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="equipmentCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="54">
      <copy-link value="54">
        <h2>Combat Cards</h2>
      </copy-link>
      <p>Combat cards modify the results of Combat in the Advanced Game only. These cards are removed for the Basic Game. These cards contain only the common information listed on page <hash-link value="48" />.</p>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="combatCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="55">
      <copy-link value="55">
        <h2>Adversary Cards</h2>
      </copy-link>
      <p>Adversary cards hinder opposing Agents by engaging them in Combat. Each card will note when it may be played. These cards contain the common information listed on page <hash-link value="48" /> and the following additional information.</p>
      <ol>
        <li>The<b>Adversary's statistics:</b> Tells the <b>HEALTH</b>, <b>LRC</b>, and <b>CRC</b> of this Adversary.</li>
      </ol>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="adversaryCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="56">
      <copy-link value="56">
        <h2>Site Cards</h2>
      </copy-link>
      <p>Site Cards form the basis of your investigation. Note that some Site cards have two questions and Skills that you may choose between while others have only one. These cards contain the common information listed on page <hash-link value="48" /> and the following additional information.</p>
      <ol>
        <li>The <b>Site PREREQUISITE</b>: Each Site will list a Prerequisite that must be met in order to use the Site card effectively. In most cases this will be a Skill followed by a number. The number is the level of Skill the Agents in the field must obtain to use the card.</li>
        <li>The <b>QUESTION</b>: The type of question you may ask your opponent regarding the X-File they have chosen for this game. In order to ask the question, your investigating Team must meet the card's Prerequisite.</li>
      </ol>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="siteCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="57">
      <copy-link value="57">
        <h2>Agent Cards</h2>
      </copy-link>
      <p>Agents are the nemesis of the X-File. While X-Files attempt to maintain their secrecy, the Agents are trying to identify them. These cards contain the common information listed on page <hash-link value="48" />, with the exception that Agent cards do not have Activators. Agent cards also contain the following additional information.</p>
      <ol>
        <li>The <b>Agent's list of SKILLS</b>: These are each Agent's unique abilities. One skill is Criminal Investigation, a composite of many basic skills an Agent learned while at the FBI Academy.</li>
        <li>The <b>Agent's HEALTH</b>: The statistic that determines how much damage each Agent can sustain before being Hospitalized.</li>
        <li>The <b>Resource Number (RES)</b>: The number of point an Agent can contribute to the Resource Pool during the Briefing Phase.</li>
      </ol>
      <v-alert
        variant="tonal"
        color="info"
      >
        <card-image
          :card="agentCard"
          max-width="256"
          class="mx-auto"
        />
      </v-alert>
    </rule-page>
    <rule-page page="58">
      <copy-link value="58">
        <h2>X-File Cards</h2>
      </copy-link>
      <p>The X-File card represents the power behind each conspiracy. It is up to your Team of investigators to determine who or what the X-File is during the course of the game. An X-File card contains unique information from the other suits which is highlighted on the next few pages.</p>
      <p>An X-File card contains the following information.</p>
      <ol>
        <li>The <b>Name</b> of the X-File</li>
        <li>The X-File's <b>AFFILIATION</b>: Each X-File has a specific Classification.</li>
        <li>The X-File's <b>MOTIVE</b>: Each X-File is driven to do what it does for a reason.</li>
        <li>The X-File's <b>METHOD</b>: Each X-File goes about achieving its objectives in a different way.</li>
        <li>The X-File's <b>RESULT</b>: The actions that each X-File takes usually have specific results.</li>
        <li>The <b>Type</b> of card: This helps to remind you of the function of the card.</li>
        <li>The <b>Story Line</b>: A brief quote or phrase explaining the relationship between the X-File and <b>The X-Files</b> television series.</li>
      </ol>
    </rule-page>
    <rule-page page="59">
      <v-alert
        variant="tonal"
        color="info"
        class="text-center"
      >
        <card-image
          :card="xFileCard"
          max-width="256"
          class="mx-auto"
        />
        A typical X-File card
      </v-alert>
    </rule-page>
    <rule-page page="60">
      <copy-link
        value="60"
        color="blue-darken-2"
      >
        <h2 class="text-blue-darken-2">
          Affiliations
        </h2>
      </copy-link>
      <p>Each X-File has a specific classification</p>
      <v-list class="mb-4">
        <v-list-item
          title="Alien"
          subtitle="The X-File is not of this world."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-ufo-outline"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Government"
          subtitle="The X-File is a member of the government who, for whatever reason, desires to keep secret the existence of paranormal phenomena."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-bank"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Evolutionary"
          subtitle="The X-File is a product of evolution, either natural or induced by man."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-dna"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Primordial"
          subtitle="The X-File is of this world, but for whatever reason they are as yet undiscovered."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-bug"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Occult"
          subtitle="The X-File is not bound by the normal laws of science, and exists outside of what we consider normal reality."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-pentagram"
              color="blue-darken-2"
            />
          </template>
        </v-list-item>
      </v-list>
    </rule-page>
    <rule-page page="61">
      <copy-link
        value="61"
        color="orange-darken-2"
      >
        <h2 class="text-orange-darken-2">
          Motives
        </h2>
      </copy-link>
      <v-list class="mb-4">
        <v-list-item
          title="Survival"
          subtitle="The X-File merely wishes to exist. It does what it does not through malice but because it would otherwise cease to exist."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-hospital"
              color="orange-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Security"
          subtitle="The X-File is concerned with insuring that all threats to its existence are eliminated."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-lock"
              color="orange-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Control"
          subtitle="The X-File is driven by a need to control its environment. Closely related to security, this motive is based not on eliminating threats so much as being in a position of power in order to direct others to do the X-File's bidding."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-handcuffs"
              color="orange-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Knowledge"
          subtitle="The X-File is driven by the search for knowledge. It views knowledge as the only thing of real value and lets nothing get in its way."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-book-open-variant"
              color="orange-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Ideology"
          subtitle="The X-File acts upon its systematic belief system. Its beliefs are to strong that it acts regardless of the effect on others."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-pillar"
              color="orange-darken-2"
            />
          </template>
        </v-list-item>
      </v-list>
    </rule-page>
    <rule-page page="62">
      <copy-link
        value="62"
        color="purple-darken-2"
      >
        <h2 class="text-purple-darken-2">
          Methods
        </h2>
      </copy-link>
      <v-list class="mb-4">
        <v-list-item
          title="Violence"
          subtitle="The most direct method, usually only the most savage X-Files resort to this method as it often results in discovery and elimination."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-pistol"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Manipulation"
          subtitle="The X-File uses subtle suggestion or powers to control others and achieve objectives through their actions."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-head-cog-outline"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Subterfuge"
          subtitle="This method relies on trickery and deceiving one's opponent to accomplish goals. It is different from manipulation in that the X-File is directly involved in the act as opposed to manipulating someone else into action."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-fingerprint"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Possession"
          subtitle="The X-File forcefully takes control of another and uses that person to achieve its goals. This can be done through the implanting of an alien device or through supernatural possession of the body."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-drama-masks"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Threats"
          subtitle="The X-File is in a position of power and uses direct threats to compel others to do its bidding."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-alert"
              color="purple-darken-2"
            />
          </template>
        </v-list-item>
      </v-list>
    </rule-page>
    <rule-page page="63">
      <copy-link
        value="63"
        color="light-green-darken-2"
      >
        <h2 class="text-light-green-darken-2">
          Results
        </h2>
      </copy-link>
      <v-list class="mb-4">
        <v-list-item
          title="Death"
          subtitle="The victim of the X-File's actions is found deceased."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-skull"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Insanity"
          subtitle="Those who come into contact with this X-File are unable to mentally cope with the encounter."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-brain"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Physiological Imbalance"
          subtitle="The X-File's victim is detrimentally altered as a result of the experience. These changes often cause severe debilitation and can ultimately result in death."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-pulse"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Abduction"
          subtitle="Victims of this X-File's actions tend to disappear and are never seen again or are found in strange places long after they disappeared with no memory of the experience."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-van-utility"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
        <v-list-item
          title="Manipulation of Evidence"
          subtitle="The X-File's actions result in the loss or destruction of evidence pertaining of the X-File or one of their security issues."
        >
          <template #prepend>
            <v-avatar
              icon="mdi-puzzle"
              color="light-green-darken-2"
            />
          </template>
        </v-list-item>
      </v-list>
    </rule-page>
    <rule-page page="64">
      <copy-link value="64">
        <h2>Glossary</h2>
      </copy-link>
      <p><b>Activator</b>: Signifies when a particular card may be played. In general, there are three different categories of Activators in the game: Active, Conspiracy, all others.</p>
      <p><b>Active</b>: A condition which exists when it is your turn. Commonly listed as an Activator.</p>
      <p><b>Active Player</b>: The player whose turn it currently is. Also known as the Investigating Player.</p>
      <p><b>Alternately</b>: Cards featuring this word offer a choice of more than one game effect which can be used during game play, however, only one game effect may be chosen.</p>
      <p><b>Conspiracy</b>: A condition which exists when it is not your turn, commonly listed as an Activator.</p>
      <p><b>Directed Player</b>: A player targeted by a Site. Also known as a Conspiracy player.</p>
      <p><b>Investigating Player</b>: The player whose turn it currently is. Also know as the Active player.</p>
      <p><b>Keyword</b>: Signifies what categories a particular card falls under and serves as the basis for Activators.</p>
      <p><b>Negate</b>: Cancels the effect or influence of a target card; the target card is then placed in its owner's Discard pile.</p>
      <p><b>Non-Active Players</b>: Refers to a player when it is not their turn and they are not the target of a Site. Also known as a Conspiracy player.</p>
      <p><b>Skills</b>: Unique abilities that a particular Agent possesses, which aid him/her in various situations throughout the game.</p>
    </rule-page>
    <rule-page page="65">
      <copy-link value="65">
        <h2>Glossary: Skills</h2>
      </copy-link>
      <p><b>Alien Investigation</b>: The pursuit of evidence that points to the existence of extra-terrestrial life.</p>
      <p><b>Behavioral</b>: Understanding of human psychology/sociology.</p>
      <p><b>Bureaucracy</b>: Adeptness in influencing governmental entities to bypass obstacles, acquire resources, gain favors, etc.</p>
      <p><b>Close Range Combat</b>: Expertise in hand-to-hand, close-quarter fighting.</p>
      <p><b>Computer</b>: Knowledge of the intricacies of computer functions, and the means of acquiring electronic information.</p>
      <p><b>Criminal Investigation</b>: Aptitude in law enforcement procedures following a crime (witness questioning, surveillance, suspect arrests, etc).</p>
      <p><b>Evidence Collection</b>: Proficiency if gathering clues at a crime scene (fingerprints, bloodstains, etc).</p>
      <p><b>Long Range Combat</b>: Expertness in handling long range weaponry (assault rifles, shotguns, etc).</p>
      <p><b>Medical</b>: Proficiency in trauma care and first aid.</p>
      <p><b>Observation</b>: Having a knack in spotting minute details that might otherwise have been missed at a crime scene (misplaced/missing objects, unusual evidence left behind, etc).</p>
      <p><b>Occult Investigation</b>: Pursuit of evidence that leads to the existence of paranormal phenomena.</p>
      <p><b>Sciences</b>: Understanding of the natural laws of the physical world.</p>
      <p><b>Subterfuge</b>: Deftness in covert operations and situations that involve hiding, sneaking and espionage.</p>
    </rule-page>
    <rule-page page="66">
      <v-table class="mb-4">
        <tbody>
        <tr>
          <td>Activator</td>
          <td>
            <hash-link value="16" />
          </td>
          <td>Healing</td>
          <td>
            <hash-link value="20" />
          </td>
        </tr>
        <tr>
          <td>Active</td>
          <td>
            <hash-link value="8" />
          </td>
          <td>Healing Phase</td>
          <td>
            <hash-link value="20" />
          </td>
        </tr>
        <tr>
          <td>Adversaries</td>
          <td>
            <hash-link value="55" />
          </td>
          <td>HEALTH</td>
          <td>
            <hash-link value="20" />
          </td>
        </tr>
        <tr>
          <td>AFFILIATION</td>
          <td>
            <hash-link value="60" />
          </td>
          <td>Hospital</td>
          <td>
            <hash-link value="6" />
          </td>
        </tr>
        <tr>
          <td>Bluff</td>
          <td>
            <hash-link value="25" />
          </td>
          <td>Investigating Player</td>
          <td>
            <hash-link value="8" />
          </td>
        </tr>
        <tr>
          <td>Bluffs</td>
          <td>
            <hash-link value="52" />
          </td>
          <td>Investigation Phase</td>
          <td>
            <hash-link value="27" />
          </td>
        </tr>
        <tr>
          <td>Briefing Phase</td>
          <td>
            <hash-link value="18" />
          </td>
          <td>Keyword</td>
          <td>
            <hash-link value="17" />
          </td>
        </tr>
        <tr>
          <td>Bureau</td>
          <td>
            <hash-link value="6" />
          </td>
          <td>METHOD</td>
          <td>
            <hash-link value="62" />
          </td>
        </tr>
        <tr>
          <td>Bureau Deck</td>
          <td>
            <hash-link value="5" />
          </td>
          <td>MOTIVE</td>
          <td>
            <hash-link value="61" />
          </td>
        </tr>
        <tr>
          <td>Case Assignment Phase</td>
          <td>
            <hash-link value="24" />
          </td>
          <td>Notebook</td>
          <td>
            <hash-link value="6" />
          </td>
        </tr>
        <tr>
          <td>Characteristic</td>
          <td>
            <hash-link value="37" />
          </td>
          <td>Phase</td>
          <td>
            <hash-link value="8" />
          </td>
        </tr>
        <tr>
          <td>Conspiracy</td>
          <td>
            <hash-link value="12" />
          </td>
          <td>Pools</td>
          <td>
            <hash-link value="10" />
          </td>
        </tr>
        <tr>
          <td>CP (<icon-conspiracy-pool />)</td>
          <td>
            <hash-link value="8" />
          </td>
          <td>Prerequisite</td>
          <td>
            <hash-link value="24" />
          </td>
        </tr>
        <tr>
          <td>Damage</td>
          <td>
            <hash-link value="34" />
          </td>
          <td>Requisition Phase</td>
          <td>
            <hash-link value="21" />
          </td>
        </tr>
        <tr>
          <td>Debriefing Phase</td>
          <td>
            <hash-link value="38" />
          </td>
          <td>Resource</td>
          <td>
            <hash-link value="11" />
          </td>
        </tr>
        <tr>
          <td>Deployment Phase</td>
          <td>
            <hash-link value="23" />
          </td>
          <td>RESULT</td>
          <td>
            <hash-link value="63" />
          </td>
        </tr>
        <tr>
          <td>Directed Player</td>
          <td>
            <hash-link value="8" />
          </td>
          <td>RP (<icon-resource-pool />)</td>
          <td>
            <hash-link value="8" />
          </td>
        </tr>
        <tr>
          <td>Discard Pile</td>
          <td>
            <hash-link value="6" />
          </td>
          <td>Sites</td>
          <td>
            <hash-link value="56" />
          </td>
        </tr>
        <tr>
          <td>Equipment</td>
          <td>
            <hash-link value="53" />
          </td>
          <td>Skill Check</td>
          <td>
            <hash-link value="28" />
          </td>
        </tr>
        <tr>
          <td>Events</td>
          <td>
            <hash-link value="50" />
          </td>
          <td>Skill Check Subroutine</td>
          <td>
            <hash-link value="28" />
          </td>
        </tr>
        <tr>
          <td>Field</td>
          <td>
            <hash-link value="6" />
          </td>
          <td>Team</td>
          <td>
            <hash-link value="23" />
          </td>
        </tr>
        <tr>
          <td>Game Effect</td>
          <td>
            <hash-link value="15" />
          </td>
          <td>Witness</td>
          <td>
            <hash-link value="51" />
          </td>
        </tr>
        </tbody>
      </v-table>
    </rule-page>
    <rule-page page="67">
      <table class="w-100 mb-3">
        <tbody>
          <tr>
            <td class="text-right pa-1">
              <b>Game Designers</b>:
            </td>
            <td class="pa-1">
              Ron Kent & Duncan Macdonell
            </td>
          </tr>
          <tr>
            <td class="text-right pa-1">
              <b>Playtest Coordinators</b>:
            </td>
            <td class="pa-1">
              Andy Graumann & Mark Hinds
            </td>
          </tr>
          <tr>
            <td class="text-right pa-1">
              <b>Playtest Web support</b>:
            </td>
            <td class="pa-1">
              Ryan Vener & Jesus Valdovinos
            </td>
          </tr>
          <tr>
            <td class="text-right pa-1">
              <b>Project Manager</b>:
            </td>
            <td class="pa-1">
              Randy Osuna
            </td>
          </tr>
          <tr>
            <td class="text-right pa-1">
              <b>Rules</b>:
            </td>
            <td class="pa-1">
              Andy Graumann
            </td>
          </tr>
          <tr>
            <td class="text-right pa-1">
              <b>Graphic Design & Production</b>:
            </td>
            <td class="pa-1">
              November Lazar Scher, Inc.
            </td>
          </tr>
        </tbody>
      </table>
      <p><b>Special Thanks to</b>: Game Empire in San Diego, Terry Stasch of Print World in Santee, Les Kollegian, Joanne White, Jack Everitt, David Spangler, Mara Kent, and Joy Macdonell.</p>
      <p><b>Playtesters</b>: Mike Durnell, David Spangler, Patrick McKee, Robert Lear, Ralph Anderson, Mike Yang, Brian Woodward, Corey Lopardi, Vinnie Verrinoldi, <b>David May</b>, Roxanne Barbour, Dmitri Salcedo, Robert Mair, Scott Parker, Eric Whitten, Richard Pontius, Brian Schutt, Geoffrey Colman, Bill Pollock, Jeff Odum, Tony Chin, Tim Cropley, David Thiel, Michael Mykita, Adrian McCanna, Tomas Espino Jr., Micah Davenport, Rebeca Richardson, Kris Richardson, Robin Horsley, Donald Richardson, Angela Mykita, Jeffrey Sweeney, Kimberly Rogalski, Terran McCanna, Tony St. Clair, Floris van Velden, Ronald Nusteling, Jonathan Yu, Jason Linette, James Lee, Patrick McDonough, Donald Bowles, Tiffany LaRue, Liza Rivera, Victoria Pingarron, Greg Marshall, Joseph Carco, David Bowder, Chuck May, Cathy Mayo, John Gee, Colleen Nechuolodoff, Aidan Spangler, John-Michael Spangler, Travis Illig, Holly Pettit, Ken Grey, Desmond White, Denis Roy, Mike Meaney, Matt Pontius, Vasanth Bala, Jeffrey Alexander, Steve Jay, Brian Cohen, Scott Colman, Victor Nolasco, Lance Olson, John Wilkes, Derek Lofthouse, William Barrett, Shakira Khan, Alonzo Sanchez, Brent Griffith, Kok Ping Liew, Catherine Cropley, Michael Wise, Sheridan Green, Barbara Sylvis, Edmund Sylvis, Sandra Boggs, Ray Wisneski, Gordon Jefferson, Fabian Melero, Nick Henderson, Kamar Bratko, Ronnie Parks, Joshua Pasto, Tim Washington, John Maure, William Kendall, Tony Story, Omar Ghannoum, David Linch, Dave Kufner, Geoffrey Brizzolara, Robert Diaz, John Mack, Thomas Alnwick, Marc Alnwick, James Dieter, David Obrien, Brett Blankenship, Alberto Gois, Joe Gois, Mical Bernabe, Frankie Sandburg, Mike Walker, Joshua Rigrod, Kyle Smith, Caroline Braun, Michael DeBoard, Scott King, Randy Vorachack, Paddy Heiliger, Cheryl Kallenbach, Brian Kallenbach, Chuck Kallenbach II, Richard Engler, Claude Mona, Cynthia Quo, Jeffrey Hembroff, Thomas Skalski, Scott Willems, Frederic Gingras, Frederic Genest, Jean-Francois Laplante, Jean-Philippe Thibault, Omar Ghannoum, David Mogilner, Jon Ciesielski, and everyone else who helped in the game testing process.</p>
    </rule-page>
    <rule-page page="68">
      <copy-link
        value="68"
        color="red"
      >
        <h2 class="text-red">
          Advanced Game Quick Reference
        </h2>
      </copy-link>
      <h3>Sequence of Play</h3>
      <ul>
        <li>
          Briefing Phase
          <ul>
            <li>
              <hash-link value="18">
                Draw Card
              </hash-link>
            </li>
            <li>
              <hash-link value="18">
                Create <icon-resource-pool />s (Resource Points)
              </hash-link>
            </li>
            <li>
              <hash-link value="18">
                Buy Cards for <icon-resource-pool />s (RPs)
              </hash-link>
            </li>
            <li>
              <hash-link value="18">
                Opponents Sell Cards for <icon-conspiracy-pool /> (CPs)
              </hash-link>
            </li>
            <li>
              <hash-link value="18">
                Opponents Buy Cards for <icon-conspiracy-pool />s (CPs)
              </hash-link>
            </li>
          </ul>
        </li>
        <li>
          Healing Phase
          <ul>
            <li>
              <hash-link value="20">
                Agents Recover HEALTH
              </hash-link>
            </li>
          </ul>
        </li>
        <li>
          Requisition Phase
          <ul>
            <li>
              <hash-link value="21">
                Agents Obtain Equipment
              </hash-link>
            </li>
          </ul>
        </li>
        <li>
          Deployment Phase
          <ul>
            <li>
              <hash-link value="23">
                Agents Assigned to Section
              </hash-link>
            </li>
          </ul>
        </li>
        <li>
          Case Assignment Phase
          <ul>
            <li>
              <hash-link value="24">
                Site Card Played
              </hash-link>
            </li>
            <li>
              <hash-link value="25">
                Assign Bluffs
              </hash-link>
            </li>
          </ul>
        </li>
        <li>
          Investigation Phase
          <ul>
            <li>
              <hash-link value="27">
                Assign Agents to Sites
              </hash-link>
            </li>
            <li>
              <hash-link value="27">
                Site(s) Investigated
              </hash-link>
            </li>
            <li>
              <hash-link value="27">
                Resolve Bluffs
              </hash-link>
            </li>
            <li>
              <hash-link value="28">
                Play Cards
              </hash-link>
            </li>
            <li>
              <hash-link value="37">
                Resolve Site
              </hash-link>
            </li>
          </ul>
        </li>
        <li>
          Debriefing Phase
          <ul>
            <li>
              <hash-link value="38">
                Discard Excess Cards
              </hash-link>
            </li>
          </ul>
        </li>
      </ul>
    </rule-page>
  </layout-content>
</template>

<style lang="scss" scoped>
b, i {
  color: rgb(var(--v-theme-primary));
}

.v-alert {
  margin-bottom: 1rem;

  p:last-child {
    margin-bottom: 0;
  }
}

.v-alert__content {
  a, b, i {
    color: currentColor;
  }
}

.v-alert.text-info .v-alert__content {
  a, b, i {
    color: lightskyblue;
  }
}

.v-list:deep(.v-list-item-subtitle) {
  -webkit-line-clamp: none;
  line-clamp: none;

  opacity: 1;

  color: rgba(white, .7);
}

.list-style-type--lower-alpha {
  list-style-type: lower-alpha;
}

.list-style-type--lower-roman {
  list-style-type: lower-roman;
}

.transition-transform {
  transition: transform .2s ease-out;
}

.transform--rotate-90 {
  transform: rotate(90deg);
}
</style>