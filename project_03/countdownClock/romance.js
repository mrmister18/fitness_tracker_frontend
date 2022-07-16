function parseText(sentence) {
    let sentenceArray = []
    let word = ""
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] !== " ") {word += sentence[i]}
      if (sentence[i] === " ") {
        sentenceArray.push(word)
        word = ""}
      if (i === sentence.length - 1) {sentenceArray.push(word)}
    } return sentenceArray
}