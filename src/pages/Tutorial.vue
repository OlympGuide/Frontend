<template>
  <div class="page-container-placement">
    <p class="page-title">OlympGuide Tutorial</p>

    <h2>1. Startseite</h2>
    <p>Wenn Sie OlympGuide besuchen, landen Sie zunächst auf der Startseite. Diese ist in zwei Hauptbereiche unterteilt:
    </p>
    <br>
    <ul class="list-disc">
      <li><strong>Menu:</strong><br> Auflistung aller verfügbaren Funktionen</li>
      <li><strong>Karte:</strong><br> Eine interaktive Karte, die die wichtigste Funktionalität von OlympGuide
        darstellt.</li>
    </ul>
    
    <br><br>
    <br><br>
    <h2>2. Karte</h2>
    <p>Auch ohne Anmeldung können Sie die Karte durchsuchen und Sportplätze finden. Um dies zu erleichtern, steht Ihnen
      ein Filter zur Verfügung:</p>
    <br>
    <ul class="list-disc">
      <li><strong>Filteroptionen:</strong><br> Sie können nach Sportart oder Verfügbarkeit filtern.</li>
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
    <ul class="list-disc">
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
    <ul class="list-disc">
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

  li {
    @apply mt-2;
  }
</style>