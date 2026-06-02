const SHA256 = require("crypto-js/sha256");

class Block {

  constructor(
    index,
    timestamp,
    data,
    previousHash = ""
  ) {

    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;

    this.hash = this.calculateHash();
  }

  calculateHash() {

    return SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {

  static createGenesisBlock() {

    return new Block(
      0,
      "01/01/2026",
      "Genesis Block",
      "0"
    );
  }

  static createReportChain(reportData) {

    const genesis =
      this.createGenesisBlock();

    const reportBlock =
      new Block(
        1,
        new Date().toISOString(),
        reportData,
        genesis.hash
      );

    return [
      genesis,
      reportBlock
    ];
  }

  static verify(chain) {

    if (!chain || chain.length < 2) {
      return false;
    }

    for (
      let i = 1;
      i < chain.length;
      i++
    ) {

      const current =
        chain[i];

      const previous =
        chain[i - 1];

      const recalculatedHash =
        SHA256(
          current.index +
          current.previousHash +
          current.timestamp +
          JSON.stringify(current.data)
        ).toString();

      if (
        current.hash !==
        recalculatedHash
      ) {
        return false;
      }

      if (
        current.previousHash !==
        previous.hash
      ) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;