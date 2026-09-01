async function main() {
  if (!process.env.XAI_API_KEY) {
    console.log("No XAI_API_KEY. Skipping generation. Deterministic diagrams remain.");
    return;
  }
  console.log("Connect this script to xAI image generation and write media-manifest.json entries.");
}

main();
