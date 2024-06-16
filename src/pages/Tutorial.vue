<template>
  <div class="page-container-placement">
    <p class="page-title">OlympGuide Tutorial</p>

    <h2>1. Home</h2>
    <p>Die Homepage des OlympGuides besteht aus der grossen Interaktiven Karte und einem Menu, welche alle nötigen Funktionen beinhaltet. </p>
    <br>
    <ul>
      <li><strong>Menu:</strong><br> Auflistung aller verfügbaren Funktionen
        <ul class="sublist">
          <li>Login</li>
          <li>Interaktive Karte</li>
          <li>Reservationen</li>
          <li>Einstellungen</li>
          <li>Tutorial</li>
        </ul>
      </li>
      <li><strong>Karte:</strong><br> Eine interaktive Karte, die die wichtigste Funktionalität von OlympGuide
        darstellt.</li>
    </ul>
    
    <br><br>
    <br><br>
    <h2>2. Karte</h2>
    <p>Auf der Karte können sie beliebige Sportplätze finden. Um dies zu erleichtern, steht Ihnen ein Filter zur Verfügung:</p>
    <br>
    <ul>
      <li><strong>Filteroptionen:</strong><br> Sie können nach der Sportart filtern um  ihre Suche zu vereinfachen.</li>
      <li><strong>Interaktive Karte:</strong><br> Die Karte passt sich den gewählten Filtern an. Klicken Sie auf einen
        Sportplatz, um Details zu sehen.</li>
      <li><strong>Hinweis:</strong> Die Option zur Sportplatzreservation ist nur nach dem Login verfügbar.</li>
    </ul>
    
    <div class="tutorial-videos">
      <video controls>
        <source src="../assets/tutorials/Olymp Guide - Tutorial 1 - Karte.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <br><br>
    <br><br>
    <h2>3. Reservationen</h2>
    <p>Um eine Reservierung vorzunehmen, gehen Sie wie folgt vor:</p>
    <br>
    <ul>
      <li><strong>suchen:</strong><br> Suchen Sie Sportplätze in ihrer Umgebung</li>
      <li><strong>filtern:</strong><br> Der interaktive Filter erleichtert ihre Suche</li>
      <li><strong>auswählen:</strong><br> Wählen sie einen Platz aus und lesen sie seine Details</li>
      <li><strong>reservieren:</strong><br> Reservieren sie den Platz direkt im Kalender</li>
    </ul>
    <div class="tutorial-videos">
      <video controls>
        <source src="../assets/tutorials/Olymp Guide - Tutorial 2 - Reservation.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <br><br>
    <br><br>
    <h2>4. Sportplätze</h2>
    <p>Neben der Nutzung öffentlicher Sportplätze haben Sie auch die Möglichkeit, eigene Sportplätze im OlympGuide
      anzumelden:</p>
    <br>
    <ul>
      <li><strong>anfragen:</strong><br>  Geben Sie alle notwendigen Daten ein</li>
      <li><strong>prüfen:</strong><br> Ihre Anfrage wird geprüft, um Fehleinträge und Duplikationen zu vermeiden.</li>
      <li><strong>veröffentlichen:</strong><br> Bei erfolgreicher Prüfung wird Ihr Sportplatz im Portal sichtbar.</li>
    </ul>
    <div class="tutorial-videos">
      <video controls>
        <source src="../assets/tutorials/Olymp Guide - Tutorial 3 - Sportplatz erstellen.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  h2 {
    @apply text-2xl font-bold;
  }

  video {
    @apply w-4/5 mt-4 mb-4;
  }

  .tutorial-videos {
    @apply flex justify-center;
  }

  .sublist {
    @apply list-inside list-disc pl-4;
  }

  li {
    @apply mt-2;
  }
</style>