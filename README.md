## About The Project

Fullstack-App zur Automatisierung der Prozesse rund um die Stundenpläne im Rahmen der Umschulung.

### Problem:
Wöchentlich, freitags werden Stundenpläne im PDF-Format über ein Portal zu unterschiedlichen Zeiten veröffentlicht. Es besteht kein Benachrichtigungssystem. Teilnehmer:innen müssen manuell die Stundenpläne herunterladen, das Portal oft mehrmals besuchen und die Pläne suchen, was langfristig etwas mühsam ist. Des Weiteren werden bei Änderungen die aktualisierten Pläne ohne Benachrichtigung hochgeladen, und Unterrichtsausfälle/Änderungen werden nicht immer rechtzeitig bemerkt.

### Lösung:
Die App automatisiert die beschriebenen Prozesse. Das Stundenplan-Portal wird in regelmäßigen Abständen auf Updates überprüft. Bei Aktualisierungen oder neuen Plänen werden diese heruntergeladen. Daten wie Unterrichtseinheiten und -zeiten werden aus der PDF extrahiert und in einer MongoDB-Datenbank gespeichert. Klassenkamerad:innen werden über einen gemeinsamen Discord-Server über Updates benachrichtigt, mithilfe eines Discord-Bots, der auch Details zu Änderungen übermittelt und Download-Links bereitstellt. Zusätzlich werden die Stundenplandaten in einen Google Kalender eingefügt.

Die Teilnehmer:innen müssen wöchentlich Berichtshefte führen, in denen behandelte Unterrichtsthemen und Aktivitäten in Praxiseinheiten dokumentiert werden. Die App automatisiert und vereinfacht diese Prozesse. Unterrichtseinheiten, Dauer und Zeiten werden jede Woche automatisch in ein Excel-Template eingefügt und über Discord zur Verfügung gestellt.

In der Datenbank gespeicherte Informationen zu alten und zukünftigen Stundenplänen werden über eine interaktive Web-App dargestellt, man kann auch einzelne Themen für das Berichtsheft für jeweilige Module eintragen. Es besteht somit ein Synchronisierter Verlauf zwischen allen Teilnehmer:innen. Daraus kann ein Berichtsheft generiert und in Excel-Format runtergeladen werden.

Die Web-App löst das Problem, dass man wöchentlich manuell Stundenpläne herunterladen muss. Ein aktueller Stundenplan wird immer sofort auf der Webseite angezeigt, und Unterrichtsthemen können direkt eingetragen werden – alles zentralisiert in einer App.


</br>

## Built With
- React, Node, Express, MongoDB, Tailwind
- Playwright, Discord.js, Excel.js, Google Apis

</br>



## Demo
https://stundenplan-app-demo.onrender.com/

In der Demoversion sind nur eine begrenzte Anzahl an alten Stundenplänen sichtbar, wobei die Namen zensiert sind. Der Aktualisierungs-Teil der App ist deaktiviert. Das Backend ist jedoch aktiv, und es ist möglich, Themen einzutragen, die auch in der Datenbank gespeichert und aktualisiert werden.
