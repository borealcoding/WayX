# 🚵 WayX | Proyecto Final de Ciclo - 2º DAM

<br/>

[![runs with expo](https://img.shields.io/badge/Runs%20with%20Expo-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.io/)
![Java](http://img.shields.io/badge/-Java-007396?style=flat-square&logo=java&logoColor=ffffff)
![Android](http://img.shields.io/badge/-Android-3DDC84?style=flat-square&logo=android&logoColor=ffffff)
![JavaScript](https://img.shields.io/badge/-JavaScript-%23F7DF1C?style=flat-square&logo=javascript&logoColor=000000&labelColor=%23F7DF1C&color=%23FFCE5A)
![React](https://img.shields.io/badge/-React-%23282C34?style=flat-square&logo=react)
[![MySQL](https://img.shields.io/badge/-MySQL-black?style=flat-square&logo=mysql&link=https://github.com/LuizCarlosAbbott/)](https://github.com/LuizCarlosAbbott/)
![VS Code](http://img.shields.io/badge/-VS%20Code-007ACC?style=flat-square&logo=visual-studio-code&logoColor=ffffff)
![Eclipse-IDE](http://img.shields.io/badge/-Eclipse-2C2255?style=flat-square&logo=eclipse&logoColor=ffffff)

<br/>

![wayX-banner](./docs/img/bannerWayX.png)

## Index

<br/>
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- **Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)* -->

- [Enlace de descarga de la app ✨](#enlace-de-descarga-de-la-app-)
- [Contacto 👨🏻‍💻](#contacto-%E2%80%8D)
- [Descripción ⚙️](#descripci%C3%B3n-)
- [Objetivo 📈](#objetivo-)
- [Justificación ⚖️](#justificaci%C3%B3n-)
- [Resultados obtenidos 📊](#resultados-obtenidos-)
- [Tecnologías utilizadas 📱](#tecnolog%C3%ADas-utilizadas-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<br/>

## Enlace de descarga de la app ✨

Para poder probar WayX, tendrás que descargar la app desde el código QR indicado abajo.

<br/>

- Android:

![QR-Android](./docs/img/wayX_qr_app.png)

> Para poder instalar la app correctamente, deberemos dar permiso para instalar apps de fuentes externas, o bien, activar el modo avión. Esto será necesario, ya que no está publicada en Google Play Store.

<br/>

También puedes testear el prototipo desde el siguiente enlace: <a href="https://x09tbc.axshare.com">Axure WayX Prototype</a>

## Contacto 👨🏻‍💻

```javascript
const WayX = [
    developer: {
        name: "Eduardo Ruá Chamorro",
        email: "edruch@floridauniversitaria.es; eruach98@gmail.com",
        role: "Software Developer",
    },
];
```

> Para cualquier duda sobre el funcionamiento de nuestra app, como para solucionar errores de ejecución, o sugerencias en cuanto al diseño y accesibilidad de WayX, puedes contactar conmigo a través de mi correo electrónico, mediante LinkedIn o Twitter, o bien, publicando una issue.

<br/>

## Descripción ⚙️

Proyecto de ampliación/mejora de la app propuesta, que recibe el nombre de WayX, cuyo propósito explico a continuación.
¿Por qué se ha elegido el nombre de WayX? Way, que en inglés quiere decir camino, en referencia a que, los puntos de interés creados por cada usuario servirán a otros para definir un “camino” de lugares interesantes. Asimismo, la X representa la exclusividad que se desea transmitir al ofrecer una app innovadora, que incluya diversas funcionalidades en un mismo lugar, facilitando al máximo la vida de la comunidad de usuarios.
De manera breve, WayX es una aplicación que trata de facilitar a los usuarios la posibilidad de crear y recorrer puntos de interés turístico, en función del tipo de lugar y de actividad.
Asimismo, los usuarios recibirán recomendaciones de lugares en función de la cercanía a la ubicación especificada en su perfil (siendo esta, una provincia española), y según qué actividad prefiera hacer.
Todos los puntos de interés forman parte de la app gracias a la aportación de su comunidad de usuarios, creándolos, aportando la información requerida.

> Para poder utilizar la app y disfrutar de las posibilidades que ofrece, será necesario registrarse como usuario.

<br/>

## Objetivo 📈

En sí, el objetivo principal es, acercar WayX a un mayor público, más concretamente a las personas que estén interesadas en descubrir lugares adaptados a sus necesidades e intereses, por lo tanto, se han mejorado funcionalidades que hacen hincapié en estos aspectos.
No necesariamente está enfocada a un determinado sector de la población, quizá se podría pensar que está enfocada a los usuarios que practican senderismo o turismo natural, pero realmente, el objetivo no es ese.
Para lograr captar el mayor número de usuarios, estos deben tener a su mano la posibilidad de personalizar todo lo posible su experiencia en la app, para que no se vean obligados a buscar fuera de ella, bien por páginas web, o mediante otras apps. WayX debe ser la que incluya todas las funcionalidades necesarias.

> WayX será una aplicación gratuita en su lanzamiento y estará disponible, por el momento, a través de descarga escaneando el código QR indicado más arriba. En futuras actualizaciones, podrás encontrarla tanto en Google Play Store como en la Apple Store.

<br/>

## Justificación ⚖️

En ocasiones nos vemos obligados a utilizar diversas apps para obtener información de lugares turísticos, quizá para encontrar un buen restaurante donde comer, sitios interesantes por los que pasear o conocer nuevas experiencias, o tal vez rutas adaptadas a nuestras necesidades. En ese caso, podríamos pensar en una app que nos permita encontrar todo lo que necesitamos, sin tener que recurrir a fuentes externas, unificándolo todo en un mismo lugar.
WayX ayudará a los usuarios a satisfacer todos los supuestos mencionados anteriormente, y a la vez, a mejorar su experiencia a través del feedback de la comunidad.

<br/>

## Resultados obtenidos 📊

Tras implementar las mejoras ideadas al principio del desarrollo del proyecto, se han obtenido los siguientes resultados.

<strong>Opciones de personalización</strong>

El usuario ahora podrá personalizar todavía más sus preferencias, pudiendo elegir un mayor número de tipos de ruta y de actividad. Al haber implementado la funcionalidad del pronóstico meteorológico, y desde la pantalla de configuración de perfil, el usuario podrá elegir las unidades de medida preferidas en las que desea ver la información del tiempo del lugar que va a visitar, pudiendo ser:

- Temperatura: Unidades C (Celsius), Fahrenheit (F), y Kelvin (K)
- Distancia: kilómetros (km), millas (mi), millas náuticas (nm)
- Velocidad del viento: km/h (Kilómetros por hora), mi/h (millas por hora), m/s (metros por segundo)

Asimismo, y para aumentar el alcance de WayX, se ha añadido soporte para la mayoría de las lenguas españolas, pudiendo elegirse:

- Inglés, valenciano, aranés, gallego, euskera, castellano, catalán, asturiano y aragonés.

Además, el usuario podrá añadir una biografía a su perfil, pudiendo añadir en ella la información que desee.

También hay que destacar, que, en el momento de crear un punto, si el tipo de ruta de este es por montaña, o bien, el tipo de actividad es el senderismo, se habilitará una opción más de configuración para ese punto, y es que el usuario podrá indicar el nivel de dificultad de este lugar, para que los usuarios que se animen a realizar caminos por montaña sepan a priori el nivel de experiencia que necesitarán para completar el recorrido.

Haciendo esto, podemos entender que el nivel fácil está destinado a personas con poca experiencia en lugares de este tipo, así como para familias que deseen pasar la tarde sin mayores problemas. En cambio, el nivel avanzado será sólo para personas con la suficiente experiencia como para afrontar caminos arduos y angostos.

> Todas las opciones indicadas anteriormente estarán reflejadas e interactuarán con la base datos, para que exista una persistencia en los datos que nos haya proporcionado el usuario, así no tendrá que añadirlos de nuevo, con lo cual, quedarán guardados en la información de su perfil.

<br/><strong>Funcionalidades que favorecen la experiencia del usuario</strong>

A continuación, se detallan las mejoras destinadas a brindar una mayor flexibilidad en el uso de la app:

- En la pantalla **PointMap**, en el que el usuario puede guardar la ubicación del punto que desea crear, ya no será necesario arrastrar el marcador hasta el sitio, sino que se ha habilitado una barra de búsqueda que permitirá encontrar el lugar más fácilmente.
- La **funcionalidad de búsqueda** mediante filtros ya no se encuentra en la pantalla **Explore**, sino que su funcionamiento se ha movido a un Backdrop que puede visualizarse al pulsar sobre la barra de búsqueda de la pantalla **Home**. Ahora es posible realizar el filtrado de una manera más cómoda y visual.
- Se ha aplicado un **nuevo diseño** a toda la aplicación, con el propósito de crear una consistencia que antes no teníamos. Se ha seguido un esquema más minimalista para que el usuario pueda navegar por WayX sin ningún problema, y poder hacerlo cómodamente al encontrarse con elementos más vistosos y menos rígidos.
- En **RouteInfo**, se ha quitado el contenedor que mostraba las coordenadas del punto de interés, ya que esto para el usuario es redundante. Además, no las necesita para dibujar el recorrido que debe realizar para llegar a su destino, ya que de esto se encarga la funcionalidad propia de **Google Navigation** invocada al pulsar en “Iniciar”.

<br><strong>Implementaciones destacadas</strong>

En la pantalla de **RouteInfo**, encargada de mostrar la información del punto de interés, se ha implementado un _“widget”_ o _“card”_ encargado de mostrar el **pronóstico meteorológico** del lugar que se está consultando. Este incluye detalles como:

- Día de la semana
- Temperatura actual, máxima y mínima
- Hora de la última actualización
- Localización
- Velocidad del viento
- Porcentaje de humedad
- Descripción breve del pronóstico
- Iconografía representativa del mismo

Finalmente, se ha añadido la **funcionalidad social de WayX**. Esta consiste en una sección que encontraremos en **RouteInfo**, en la que el usuario podrá escribir una reseña sobre el punto de interés, donde podrá opinar sobre si le ha parecido interesante, quizá si la recomienda o no a otros usuarios, etc. Al momento de publicar su reseña, tanto su imagen de perfil como el nombre de usuario, serán visibles junto al comentario publicado.

Esta última funcionalidad interactúa con la base de datos.

## Tecnologías utilizadas 📱

<strong>Lenguajes de programación:</strong> 👾<br/>
Para realizar la programación de nuestra App, haremos uso del lenguaje
React Native, mediante <strong>Expo</strong>, que nos proporcionará una cantidad generosa de
herramientas, librerías, y recursos útiles disponibles en su documentación
oficial.
Además, este lenguaje es Cross-Platform, es decir, podremos desarrollar
Apps tanto para iOS como para Android.<br/>
Aparte, se programará con Java todo lo relacionado con la parte del servidor.<br/>
<br/><strong>Servidores de bases de datos o hostings:</strong> 💾<br/>
Se hará uso de Microsoft Azure para todo el trabajo
relacionado con el servidor de WebX, así como de MySQL para la programación de la base de datos.<br/>
<br/><strong>Librerías utilizadas en el proyecto:</strong> 📚<br/>
A continuación se detallan las librerías, y haciendo click sobre ellas, se accederá a la documentación correspondiente.<br/>

<ul>
<li><a href="https://reactnavigation.org/">react-navigation</a></li>
<ul>
<li><a href="https://reactnavigation.org/docs/material-bottom-tab-navigator/">material-bottom-tabs</a></li>
<li><a href="https://reactnavigation.org/docs/getting-started">native</a></li>
<li><a href="https://reactnavigation.org/docs/native-stack-navigator/">native-stack</a></li>
</ul>
<li><a href="https://github.com/react-native-picker/picker">react-native-picker</a></li>
<li><a href="https://axios-http.com/docs/intro">axios</a></li>
<li><a href="https://docs.expo.dev/get-started/installation/">expo</a></li>
<ul>
<li><a href="https://docs.expo.dev/versions/latest/sdk/imagepicker/">expo-image-picker</a></li>
<li><a href="https://docs.expo.dev/guides/linking/">expo-linking</a></li>
<li><a href="https://docs.expo.dev/versions/v44.0.0/sdk/location/">expo-location</a></li>
<li><a href="https://docs.expo.dev/versions/latest/sdk/status-bar/">expo-status-bar</a></li>
</ul>
<li><a href="https://react.i18next.com/getting-started">react-i18next</a> + <a href="https://es.acervolima.com/compatibilidad-con-varios-idiomas-en-react-native/">(guía de uso para realizar traducciones en la app)</a></li>
<li><a href="https://reactnativeelements.com/">react-native-elements</a></li>
<li><a href="https://docs.expo.dev/versions/latest/sdk/map-view/">react-native-maps</a></li>
<li><a href="https://callstack.github.io/react-native-paper/">react-native-paper</a></li>
<li><a href="https://callstack.github.io/react-native-paper/icons.html">react-native-vector-icons </a></li>
<li><a href="https://necolas.github.io/react-native-web/">react-native-web</a></li>
<li><a href="https://www.npmjs.com/package/react-native-md5">react-native-md5</a></li>

<li><a href="https://github.com/brunohkbx/react-native-material-backdrop-modal">react-native-material-backdrop</a></li>
<li><a href="https://github.com/FaridSafi/react-native-google-places-autocomplete">react-native-google-places-autocomplete</a></li>
</ul>

Todas ellas están detalladas en el package.json del proyecto, pudiendo instalarlas fácilmente con <strong>npm install</strong><br/>
Los iconos de react-native-vector-icons utilizados en la app, pueden encontrarse en <a href="https://materialdesignicons.com/">esta biblioteca</a>.

<br/><strong>IDE y editores de código:</strong> 🖥️<br/>

<ul>
    <li><strong>Mockups | UX/UI:</strong>
El diseño ha sido realizado con la herramienta Axure, y el esquema de diseño que se ha seguido, ha sido propio, pero también mezclando elementos de Material Design de Android.</li>
    <li><strong>Programación:</strong>
El desarrollo de WayX se ha realizado con React Native mediante la plataforma Expo, en el editor de código Visual Studio Code.</li>
    <li><strong>Backend:</strong>
Se ha programado con el lenguaje Java, destinado a las peticiones REST API del servidor alojado en una máquina virtual de Microsoft Azure. Este servidor se encarga de gestionar las peticiones de envío y recepción de información, y persistirlas en una base de datos de MySQL. Esta última es gestionada desde PHPMyAdmin.<br/>
El desarrollo del servidor java se realiza en el IDE de Eclipse.</li>
</ul>
