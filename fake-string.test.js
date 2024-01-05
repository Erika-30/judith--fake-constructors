const assert = chai.assert;

describe("FakeString", () => {
  it("should initialize correctly", () => {
    const fake = new FakeString("test");
    assert.equal(fake[0], "t");
    assert.equal(fake[1], "e");
    assert.equal(fake.length, 4);
  });

  describe("#charAt", () => {
    it("should return the character at the given index", () => {
      const fake = new FakeString("test");
      assert.equal(fake.charAt(1), "e");
    });

    it("should return an empty string for out-of-bound indices", () => {
      const fake = new FakeString("test");
      assert.equal(fake.charAt(100), "");
    });
  });

  describe("#substring", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeString("Codeable");
    });

    it("should return the substring from start to end", () => {
      assert.equal(fake.substring(1, 4), "ode");
    });

    it("should return the substring from start to the end of the string if end is omitted", () => {
      assert.equal(fake.substring(3), "eable");
    });

    it("should swap start and end if start > end", () => {
      assert.equal(fake.substring(4, 2), "de");
    });

    it("should treat negative or NaN as 0", () => {
      assert.equal(fake.substring(-5, 4), "Code");
      assert.equal(fake.substring(NaN, 4), "Code");
    });

    it("should treat values greater than string length as the string length", () => {
      assert.equal(fake.substring(3, 1000), "eable");
    });

    it("should return an empty string if start equals end", () => {
      assert.equal(fake.substring(3, 3), "");
    });

    it("should return the entire string if both start and end are omitted", () => {
      assert.equal(fake.substring(), "Codeable");
    });
  });

  describe("#slice", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeString("Codeable");
    });

    it("should return the slice from beginSlice to endSlice", () => {
      assert.equal(fake.slice(1, 4), "ode");
    });

    it("should return the slice from beginSlice to the end of the string if endSlice is omitted", () => {
      assert.equal(fake.slice(3), "eable");
    });

    it("should return an empty string if beginSlice > endSlice", () => {
      assert.equal(fake.slice(4, 2), "");
    });

    it("should interpret negative beginSlice or endSlice values as strLength + value", () => {
      assert.equal(fake.slice(-3, 7), "bl");
      assert.equal(fake.slice(1, -3), "odea");
    });

    it("should treat values greater than string length as the string length", () => {
      assert.equal(fake.slice(3, 1000), "eable");
    });

    it("should return an empty string if beginSlice equals endSlice", () => {
      assert.equal(fake.slice(3, 3), "");
    });

    it("should return the entire string if both beginSlice and endSlice are omitted", () => {
      assert.equal(fake.slice(), "Codeable");
    });
  });

  describe("#repeat", () => {
    it("should repeat the string the number of times given", () => {
      const fake = new FakeString("test");
      assert.equal(fake.repeat(3), "testtesttest");
    });

    it("should return an empty string if 0 times is specified", () => {
      const fake = new FakeString("test");
      assert.equal(fake.repeat(0), "");
    });
  });

  describe("#includes", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeString("Codeable");
    });

    it("should return true if the string contains the given substring", () => {
      assert.isTrue(fake.includes("Code"));
    });

    it("should return false if the string does not contain the given substring", () => {
      assert.isFalse(fake.includes("coder"));
    });

    it("should be case-sensitive", () => {
      assert.isFalse(fake.includes("code"));
    });

    it("should return true if the string contains the given substring, starting from the given position", () => {
      assert.isTrue(fake.includes("able", 4));
    });

    it("should return false if the string does not contain the given substring, starting from the given position", () => {
      assert.isFalse(fake.includes("Code", 4));
    });

    it("should treat a negative position as 0", () => {
      assert.isTrue(fake.includes("Code", -1));
    });

    it("should return false if the position is beyond the length of the string", () => {
      assert.isFalse(fake.includes("Code", 100));
    });

    it("should return true if the substring is an empty string", () => {
      assert.isTrue(fake.includes(""));
    });
  });

  describe("#concat", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeString("Codeable");
    });

    it("should return the original string if no arguments are provided", () => {
      const result = fake.concat();
      assert.equal(result, "Codeable");
    });

    it("should concatenate a single string", () => {
      const result = fake.concat(" is awesome");
      assert.equal(result, "Codeable is awesome");
    });

    it("should concatenate multiple strings", () => {
      const result = fake.concat(" is", " truly", " awesome");
      assert.equal(result, "Codeable is truly awesome");
    });

    it("should concatenate even if one of the strings is empty", () => {
      const result = fake.concat(" is", "", " awesome");
      assert.equal(result, "Codeable is awesome");
    });
  });

  describe("#indexOf", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeString("Hello, Codeable!");
    });

    it("should return -1 when the value to search for is not present", () => {
      const result = fake.indexOf("missing");
      assert.equal(result, -1);
    });

    it("should return the index of the first occurrence of a single character", () => {
      const result = fake.indexOf("o");
      assert.equal(result, 4);
    });

    it("should return the index of the first occurrence of a substring", () => {
      const result = fake.indexOf("Codeable");
      assert.equal(result, 7);
    });

    it("should return -1 if the string to search is longer than the original string", () => {
      const result = fake.indexOf("Hello, Codeable! and more...");
      assert.equal(result, -1);
    });

    it("should start searching from the specified position", () => {
      const result = fake.indexOf("o", 5);
      assert.equal(result, 8);
    });

    it("should return -1 if the start position is greater than the string length", () => {
      const result = fake.indexOf("o", 100);
      assert.equal(result, -1);
    });

    it("should handle negative start positions as 0", () => {
      const result = fake.indexOf("Hello", -5);
      assert.equal(result, 0);
    });

    it("should return 0 when searching for an empty string", () => {
      const result = fake.indexOf("");
      assert.equal(result, 0);
    });
  });

  describe("#trim", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeString("   Hello, Codeable!   ");
    });

    it("should remove leading and trailing whitespaces", () => {
      const result = fake.trim();
      assert.equal(result, "Hello, Codeable!");
    });

    it("should return the original string if no whitespaces are present", () => {
      const noSpaces = new FakeString("Hello");
      const result = noSpaces.trim();
      assert.equal(result, "Hello");
    });

    it("should remove only leading whitespaces", () => {
      const leadingSpaces = new FakeString("   Hello");
      const result = leadingSpaces.trim();
      assert.equal(result, "Hello");
    });

    it("should remove only trailing whitespaces", () => {
      const trailingSpaces = new FakeString("Hello   ");
      const result = trailingSpaces.trim();
      assert.equal(result, "Hello");
    });

    it("should return an empty string if the original string was just whitespaces", () => {
      const spacesOnly = new FakeString("     ");
      const result = spacesOnly.trim();
      assert.equal(result, "");
    });

    it("should not remove spaces in the middle of the string", () => {
      const middleSpaces = new FakeString("Hello   Codeable");
      const result = middleSpaces.trim();
      assert.equal(result, "Hello   Codeable");
    });

    it("should return the original string when called on an empty string", () => {
      const empty = new FakeString("");
      const result = empty.trim();
      assert.equal(result, "");
    });
  });

  describe("#split", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeString("Codeable is awesome");
    });

    it("should return an array with substrings split by the given delimiter", () => {
      const result = fake.split(" ");
      assert.deepEqual(result, ["Codeable", "is", "awesome"]);
    });

    it("should return an array with the entire string as its single item if no delimiter is provided", () => {
      const result = fake.split();
      assert.deepEqual(result, ["Codeable is awesome"]);
    });

    it("should return an array with the entire string as its single item if the delimiter does not match any part of the string", () => {
      const result = fake.split("xyz");
      assert.deepEqual(result, ["Codeable is awesome"]);
    });

    it("should be able to split by a single character", () => {
      const result = fake.split("e");
      assert.deepEqual(result, ["Cod", "abl", " is aw", "som", ""]);
    });

    it("should return an empty array if the original string is empty", () => {
      const emptyFake = new FakeString("");
      const result = emptyFake.split(" ");
      assert.deepEqual(result, []);
    });

    it("should return an array of individual characters if an empty string is used as the delimiter", () => {
      const result = fake.split("");
      assert.deepEqual(result, [
        "C",
        "o",
        "d",
        "e",
        "a",
        "b",
        "l",
        "e",
        " ",
        "i",
        "s",
        " ",
        "a",
        "w",
        "e",
        "s",
        "o",
        "m",
        "e",
      ]);
    });

    it("should be able to split using multi-character delimiters", () => {
      const result = fake.split(" is ");
      assert.deepEqual(result, ["Codeable", "awesome"]);
    });

    it("should be able to limit the number of splits with the second argument", () => {
      const result = fake.split(" ", 2);
      assert.deepEqual(result, ["Codeable", "is"]);
    });
  });
});
