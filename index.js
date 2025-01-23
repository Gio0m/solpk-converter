const fs = require("fs");
const bs58 = require("bs58");

function base58ToArray(base58String) {
  const decoded = bs58.decode(base58String);
  return `[${Array.from(decoded).join(",")}]`;
}

function convertKeys(inputFile, outputFile) {
  try {
    // Read base58 keys
    const keys = fs
      .readFileSync(inputFile, "utf8")
      .split("\n")
      .filter((line) => line.trim()); // Remove empty lines

    // Convert each key and collect results
    const convertedKeys = keys
      .map((key) => {
        try {
          return base58ToArray(key.trim());
        } catch (error) {
          console.error(`Error converting key: ${key}`);
          console.error(error);
          return null;
        }
      })
      .filter((key) => key !== null); // Remove failed conversions

    // Write to output file
    fs.writeFileSync(outputFile, convertedKeys.join("\n"), "utf8");
    console.log(`Successfully converted ${convertedKeys.length} keys`);
  } catch (error) {
    console.error("Error processing file:", error);
  }
}

// Run the conversion
convertKeys("bs58Pk.txt", "ArrayPk.txt");
