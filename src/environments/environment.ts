// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  fileMaxSize : 50000000,
  baseUrl : "http://ec2-15-188-193-194.eu-west-3.compute.amazonaws.com:8080/",
  mapbox : {
    accessToken : "pk.eyJ1IjoibWF0ZmFsbCIsImEiOiJja3RsaGx3ODAwMmZpMm5wYmtzNTRrN25kIn0.xjywL0L_vDNlyreSmHOFDA"
  },
  style : "mapbox://styles/mapbox/streets-v11",
  lat : 14.751523,
  lng : -17.45677,
  occurencesList : ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']
};
