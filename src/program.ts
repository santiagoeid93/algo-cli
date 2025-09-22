import { FizzBuzzCallenge } from "./challenges/fizzBuzz.ts";
import { getChallengeData } from "./static/index.ts";

(function() {
  console.log('Hello!');
  const config = getChallengeData('fizzBuzz');
  const Challenge = new FizzBuzzCallenge(config);
  console.log(Challenge.name, Challenge.difficulty);
}());