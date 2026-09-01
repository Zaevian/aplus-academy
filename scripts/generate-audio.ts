async function main() {
  if (!process.env.XAI_API_KEY) {
    console.log("No XAI_API_KEY. Voice scenarios use transcripts.");
    return;
  }
  console.log("Connect this script to xAI TTS for pre-generated help-desk audio.");
}

main();
