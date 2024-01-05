const assert = chai.assert;

describe("FakeArray", () => {
  it("should initialize correctly", () => {
    const fake = new FakeArray(1, 2, 3, 4);
    assert.equal(fake[0], 1);
    assert.equal(fake[1], 2);
    assert.equal(fake.length, 4);
  });

  describe("#push", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3);
    });

    it("should add a single item to the end of the array and return the new length", () => {
      const newLength = fake.push(4);
      assert.equal(fake[3], 4);
      assert.equal(newLength, 4);
    });

    it("should add multiple items to the end of the array and return the new length", () => {
      const newLength = fake.push(4, 5, 6);
      assert.equal(fake[3], 4);
      assert.equal(fake[4], 5);
      assert.equal(fake[5], 6);
      assert.equal(newLength, 6);
    });

    it("should correctly handle pushing undefined", () => {
      const newLength = fake.push(undefined);
      assert.equal(fake[3], undefined);
      assert.equal(newLength, 4);
    });

    it("should modify the original array", () => {
      fake.push(4);
      assert.equal(fake.length, 4);
      assert.equal(fake[3], 4);
    });

    it("should return the new length of the array, even if no elements were added", () => {
      const newLength = fake.push();
      assert.equal(newLength, 3);
    });

    it("should be able to push any type of value", () => {
      const obj = { a: 1 };
      const arr = [1, 2, 3];
      const func = () => {};

      fake.push(obj, arr, func);

      assert.strictEqual(fake[3], obj);
      assert.strictEqual(fake[4], arr);
      assert.strictEqual(fake[5], func);
    });
  });

  describe("#pop", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3);
    });

    it("should remove the last item from the array and return it", () => {
      const poppedValue = fake.pop();
      assert.equal(poppedValue, 3);
      assert.equal(fake.length, 2);
    });

    it("should modify the original array", () => {
      fake.pop();
      assert.equal(fake.length, 2);
      assert.isUndefined(fake[2]);
    });

    it("should return undefined if the array is empty", () => {
      fake = new FakeArray();
      const poppedValue = fake.pop();
      assert.isUndefined(poppedValue);
      assert.equal(fake.length, 0);
    });

    it("should handle consecutive pops correctly", () => {
      fake.pop();
      const poppedValue = fake.pop();
      assert.equal(poppedValue, 2);
      assert.equal(fake.length, 1);
      assert.isUndefined(fake[1]);
    });

    it("should return undefined even after popping from an already empty array", () => {
      fake = new FakeArray();
      fake.pop();
      const poppedValue = fake.pop();
      assert.isUndefined(poppedValue);
      assert.equal(fake.length, 0);
    });
  });

  describe("#shift", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3, 4);
    });

    it("should remove the first item from the array and return it", () => {
      const shiftedValue = fake.shift();
      assert.equal(shiftedValue, 1);
      assert.equal(fake.length, 3);
    });

    it("should modify the original array by shifting all elements to the left", () => {
      fake.shift();
      assert.equal(fake[0], 2);
      assert.equal(fake[1], 3);
      assert.equal(fake[2], 4);
      assert.isUndefined(fake[3]);
    });

    it("should return undefined if the array is empty", () => {
      fake = new FakeArray();
      const shiftedValue = fake.shift();
      assert.isUndefined(shiftedValue);
      assert.equal(fake.length, 0);
    });

    it("should handle consecutive shifts correctly", () => {
      fake.shift();
      const shiftedValue = fake.shift();
      assert.equal(shiftedValue, 2);
      assert.equal(fake.length, 2);
      assert.equal(fake[0], 3);
    });

    it("should return undefined even after shifting from an already empty array", () => {
      fake = new FakeArray();
      fake.shift();
      const shiftedValue = fake.shift();
      assert.isUndefined(shiftedValue);
      assert.equal(fake.length, 0);
    });
  });

  describe("#unshift", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(2, 3, 4);
    });

    it("should add an item to the beginning of the array and return the new length", () => {
      const newLength = fake.unshift(1);
      assert.equal(newLength, 4);
      assert.equal(fake[0], 1);
      assert.equal(fake[3], 4);
    });

    it("should modify the original array by shifting all elements to the right", () => {
      fake.unshift(1);
      assert.equal(fake[0], 1);
      assert.equal(fake[1], 2);
      assert.equal(fake[2], 3);
      assert.equal(fake[3], 4);
    });

    it("should handle unshifting multiple values correctly", () => {
      const newLength = fake.unshift(-1, 0, 1);
      assert.equal(newLength, 6);
      assert.deepEqual(fake, new FakeArray(-1, 0, 1, 2, 3, 4));
    });

    it("should work correctly on an empty array", () => {
      fake = new FakeArray();
      const newLength = fake.unshift(1, 2, 3);
      assert.equal(newLength, 3);
      assert.deepEqual(fake, new FakeArray(1, 2, 3));
    });

    it("should handle consecutive unshifts correctly", () => {
      fake.unshift(1);
      fake.unshift(-2, -1, 0);
      assert.deepEqual(fake, new FakeArray(-2, -1, 0, 1, 2, 3, 4));
    });
  });

  describe("#splice", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray("a", "b", "c", "d", "e");
    });

    it("should remove items from the array starting at the specified index", () => {
      const removed = fake.splice(2, 2);
      assert.deepEqual(fake, new FakeArray("a", "b", "e"));
      assert.deepEqual(removed, new FakeArray("c", "d"));
    });

    it("should add items to the array starting at the specified index", () => {
      const removed = fake.splice(2, 0, "x", "y");
      assert.deepEqual(fake, new FakeArray("a", "b", "x", "y", "c", "d", "e"));
      assert.deepEqual(removed, new FakeArray());
    });

    it("should remove and add items to/from the array starting at the specified index", () => {
      const removed = fake.splice(1, 2, "x", "y");
      assert.deepEqual(fake, new FakeArray("a", "x", "y", "d", "e"));
      assert.deepEqual(removed, new FakeArray("b", "c"));
    });

    it("should treat a single argument as the starting index and remove all subsequent items", () => {
      const removed = fake.splice(2);
      assert.deepEqual(fake, new FakeArray("a", "b"));
      assert.deepEqual(removed, new FakeArray("c", "d", "e"));
    });

    it("should treat negative start index as an offset from the end of the array", () => {
      const removed = fake.splice(-2, 1);
      assert.deepEqual(fake, new FakeArray("a", "b", "c", "e"));
      assert.deepEqual(removed, new FakeArray("d"));
    });

    it("should treat out-of-bounds start index as 0 (if negative) or array length (if positive)", () => {
      const removed1 = fake.splice(-100, 1, "x");
      const removed2 = fake.splice(100, 0, "y");
      assert.deepEqual(fake, new FakeArray("x", "b", "c", "d", "e", "y"));
      assert.deepEqual(removed1, new FakeArray("a"));
      assert.deepEqual(removed2, new FakeArray());
    });

    it("should handle cases where the deleteCount is greater than the number of items after start", () => {
      const removed = fake.splice(3, 100);
      assert.deepEqual(fake, new FakeArray("a", "b", "c"));
      assert.deepEqual(removed, new FakeArray("d", "e"));
    });
  });

  describe("#slice", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray("a", "b", "c", "d", "e");
    });

    it("should return a new array containing all items when no parameters are provided", () => {
      const result = fake.slice();
      assert.deepEqual(result, new FakeArray("a", "b", "c", "d", "e"));
      assert.notEqual(
        result,
        fake,
        "The result should be a new array, not a reference to the original"
      );
    });

    it("should return a portion of the array starting from the provided start index", () => {
      const result = fake.slice(2);
      assert.deepEqual(result, new FakeArray("c", "d", "e"));
    });

    it("should return a portion of the array between the provided start and end indices", () => {
      const result = fake.slice(1, 4);
      assert.deepEqual(result, new FakeArray("b", "c", "d"));
    });

    it("should handle negative start index as an offset from the end", () => {
      const result = fake.slice(-3);
      assert.deepEqual(result, new FakeArray("c", "d", "e"));
    });

    it("should handle negative end index as an offset from the end", () => {
      const result = fake.slice(1, -1);
      assert.deepEqual(result, new FakeArray("b", "c", "d"));
    });

    it("should return an empty array if start is greater than or equal to array length", () => {
      const result = fake.slice(10);
      assert.deepEqual(result, new FakeArray());
    });

    it("should treat negative start index greater than array length as 0", () => {
      const result = fake.slice(-10);
      assert.deepEqual(result, new FakeArray("a", "b", "c", "d", "e"));
    });

    it("should return an empty array if start is greater than or equal to end", () => {
      const result = fake.slice(3, 2);
      assert.deepEqual(result, new FakeArray());
    });

    it("should not modify the original array", () => {
      fake.slice(1, 3);
      assert.deepEqual(fake, new FakeArray("a", "b", "c", "d", "e"));
    });
  });

  describe("#indexOf", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray("a", "b", "c", "d", "e", "a");
    });

    it("should return the index of the first occurrence of the item", () => {
      const index = fake.indexOf("c");
      assert.equal(index, 2);
    });

    it("should return -1 if the item is not in the array", () => {
      const index = fake.indexOf("z");
      assert.equal(index, -1);
    });

    it("should start searching from the provided start index", () => {
      const index = fake.indexOf("a", 2);
      assert.equal(index, 5);
    });

    it("should return -1 if the item is not found after the provided start index", () => {
      const index = fake.indexOf("a", 6);
      assert.equal(index, -1);
    });

    it("should handle negative start index as an offset from the end", () => {
      const index = fake.indexOf("a", -2);
      assert.equal(index, 5);
    });

    it("should treat start index greater than array length as array length", () => {
      const index = fake.indexOf("a", 10);
      assert.equal(index, -1);
    });

    it("should treat negative start index greater than array length as 0", () => {
      const index = fake.indexOf("a", -10);
      assert.equal(index, 0);
    });

    it("should perform a strict comparison", () => {
      fake = new FakeArray(5);
      const index = fake.indexOf("5");
      assert.equal(index, -1, "Should not coerce types");
    });
  });

  describe("#includes", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray("apple", "banana", "cherry", "apple");
    });

    it("should return true if the array contains the item", () => {
      const hasBanana = fake.includes("banana");
      assert.isTrue(hasBanana);
    });

    it("should return false if the array does not contain the item", () => {
      const hasMango = fake.includes("mango");
      assert.isFalse(hasMango);
    });

    it("should start searching from the provided start index", () => {
      const hasApple = fake.includes("apple", 2);
      assert.isTrue(hasApple);
    });

    it("should return false if the item is not found after the provided start index", () => {
      const hasBanana = fake.includes("banana", 2);
      assert.isFalse(hasBanana);
    });

    it("should handle negative start index as an offset from the end", () => {
      const hasBanana = fake.includes("banana", -3);
      assert.isTrue(hasBanana);
    });

    it("should treat start index greater than array length as array length (always false)", () => {
      const hasBanana = fake.includes("banana", 10);
      assert.isFalse(hasBanana);
    });

    it("should treat negative start index greater than array length as 0", () => {
      const hasApple = fake.includes("apple", -10);
      assert.isTrue(hasApple);
    });

    it("should perform a strict comparison", () => {
      fake = new FakeArray(5);
      const includesString5 = fake.includes("5");
      assert.isFalse(includesString5, "Should not coerce types");
    });
  });

  describe("#join", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray("apple", "banana", "cherry");
    });

    it("should join all elements with the provided separator", () => {
      const result = fake.join("-");
      assert.equal(result, "apple-banana-cherry");
    });

    it("should join all elements using comma by default", () => {
      const result = fake.join();
      assert.equal(result, "apple,banana,cherry");
    });

    it("should join all elements and return an empty string for an empty array", () => {
      const emptyFake = new FakeArray();
      const result = emptyFake.join();
      assert.equal(result, "");
    });

    it("should handle arrays with undefined and null as empty strings", () => {
      fake = new FakeArray("apple", undefined, "cherry", null);
      const result = fake.join();
      assert.equal(result, "apple,,cherry,");
    });

    it("should join using complex separators", () => {
      const result = fake.join(" & ");
      assert.equal(result, "apple & banana & cherry");
    });

    it("should handle single-element arrays", () => {
      fake = new FakeArray("apple");
      const result = fake.join("-");
      assert.equal(result, "apple");
    });

    it("should handle empty separator", () => {
      const result = fake.join("");
      assert.equal(result, "applebananacherry");
    });
  });

  describe("#reverse", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3, 4, 5);
    });

    it("should reverse the array", () => {
      fake.reverse();
      assert.deepEqual(fake, new FakeArray(5, 4, 3, 2, 1));
    });

    it("should return the reversed array", () => {
      const result = fake.reverse();
      assert.deepEqual(result, new FakeArray(5, 4, 3, 2, 1));
    });

    it("should handle single-element arrays", () => {
      fake = new FakeArray("apple");
      const result = fake.reverse();
      assert.deepEqual(result, new FakeArray("apple"));
    });

    it("should reverse arrays with odd number of elements", () => {
      fake = new FakeArray("a", "b", "c");
      fake.reverse();
      assert.deepEqual(fake, new FakeArray("c", "b", "a"));
    });

    it("should reverse arrays with even number of elements", () => {
      fake = new FakeArray("a", "b", "c", "d");
      fake.reverse();
      assert.deepEqual(fake, new FakeArray("d", "c", "b", "a"));
    });

    it("should handle empty arrays", () => {
      fake = new FakeArray();
      const result = fake.reverse();
      assert.deepEqual(result, new FakeArray());
    });

    it("should work with arrays containing undefined and null", () => {
      fake = new FakeArray("apple", undefined, "cherry", null);
      fake.reverse();
      assert.deepEqual(fake, new FakeArray(null, "cherry", undefined, "apple"));
    });
  });

  describe("#forEach", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3, 4, 5);
    });

    it("should execute the callback for each element", () => {
      const results = [];
      fake.forEach((item) => {
        results.push(item * 2);
      });
      assert.deepEqual(results, [2, 4, 6, 8, 10]);
    });

    it("should pass the correct arguments to the callback (item, index, array)", () => {
      fake.forEach((item, index, array) => {
        assert.equal(item, array[index]);
      });
    });

    it("should handle empty arrays gracefully", () => {
      fake = new FakeArray();
      let callCount = 0;
      fake.forEach(() => {
        callCount++;
      });
      assert.equal(callCount, 0);
    });

    it("should not mutate the original array", () => {
      const original = new FakeArray(1, 2, 3, 4, 5);
      fake.forEach((item) => item * 2);
      assert.deepEqual(fake, original);
    });
  });

  describe("#map", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3, 4, 5);
    });

    it("should return a new array with the results of the callback", () => {
      const mapped = fake.map((item) => item * 2);
      assert.deepEqual(mapped, new FakeArray(2, 4, 6, 8, 10));
    });

    it("should pass the correct arguments to the callback (item, index, array)", () => {
      fake.map((item, index, array) => {
        assert.equal(item, array[index]);
      });
    });

    it("should return an array of the same length as the input", () => {
      const mapped = fake.map((item) => item + 1);
      assert.equal(mapped.length, fake.length);
    });

    it("should not mutate the original array", () => {
      const original = new FakeArray(1, 2, 3, 4, 5);
      fake.map((item) => item * 2);
      assert.deepEqual(fake, original);
    });
  });

  describe("#find", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3, 4, 5);
    });

    it("should return the first element that satisfies the provided testing function", () => {
      const found = fake.find((item) => item > 3);
      assert.equal(found, 4);
    });

    it("should return undefined if no values satisfy the testing function", () => {
      const found = fake.find((item) => item > 10);
      assert.equal(found, undefined);
    });

    it("should pass the correct arguments to the callback (item, index, array)", () => {
      fake.find((item, index, array) => {
        assert.equal(item, array[index]);
        return false; // so we can check all elements
      });
    });

    it("should stop searching as soon as the testing function returns a truthy value", () => {
      let counter = 0;
      fake.find((item) => {
        counter++;
        return item === 3;
      });
      assert.equal(counter, 3);
    });

    it("should not mutate the original array", () => {
      const original = new FakeArray(1, 2, 3, 4, 5);
      fake.find((item) => item > 3);
      assert.deepEqual(fake, original);
    });
  });

  describe("#filter", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3, 4, 5);
    });

    it("should return a new array with elements that pass the provided testing function", () => {
      const filtered = fake.filter((item) => item > 3);
      assert.deepEqual(filtered, new FakeArray(4, 5));
    });

    it("should return an empty array if no elements pass the testing function", () => {
      const filtered = fake.filter((item) => item > 10);
      assert.deepEqual(filtered, new FakeArray());
    });

    it("should pass the correct arguments to the callback (item, index, array)", () => {
      fake.filter((item, index, array) => {
        assert.equal(item, array[index]);
        return false; // so we get an empty result array
      });
    });

    it("should not mutate the original array", () => {
      const original = new FakeArray(1, 2, 3, 4, 5);
      fake.filter((item) => item > 3);
      assert.deepEqual(fake, original);
    });
  });

  describe("#sort", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(3, 1, 4, 2);
    });

    it("should sort the array in place and return the sorted array", () => {
      const sorted = fake.sort();
      assert.deepEqual(sorted, new FakeArray(1, 2, 3, 4));
      assert.equal(fake, sorted); // both should point to the same reference
    });

    it("should sort based on the provided compare function", () => {
      fake.sort((a, b) => b - a); // sort in descending order
      assert.deepEqual(fake, new FakeArray(4, 3, 2, 1));
    });

    it("should correctly sort when values are coerced into strings", () => {
      fake = new FakeArray(100, 25, 10, 5);
      fake.sort(); // default string sort
      assert.deepEqual(fake, new FakeArray(10, 100, 25, 5));
    });

    it("should be stable (does not change the relative order of elements with equal keys)", () => {
      const a = { value: 3, order: 1 };
      const b = { value: 3, order: 2 };
      fake = new FakeArray(a, b);

      fake.sort((x, y) => x.value - y.value);
      assert.equal(fake[0].order, 1);
      assert.equal(fake[1].order, 2);
    });

    it("should not mutate the length of the array", () => {
      const originalLength = fake.length;
      fake.sort();
      assert.equal(fake.length, originalLength);
    });
  });

  describe("#reduce", () => {
    let fake;

    beforeEach(() => {
      fake = new FakeArray(1, 2, 3, 4);
    });

    it("should apply a function against an accumulator and each element in the array (from left to right) and return its accumulated result", () => {
      const sum = fake.reduce((acc, currVal) => acc + currVal);
      assert.equal(sum, 10);
    });

    it("should start with the provided initial value", () => {
      const sum = fake.reduce((acc, currVal) => acc + currVal, 5);
      assert.equal(sum, 15);
    });

    it("should correctly use the initial value if the array is empty", () => {
      fake = new FakeArray();
      const sum = fake.reduce((acc, currVal) => acc + currVal, 5);
      assert.equal(sum, 5);
    });

    it("should handle array with a single item and no initial value, by returning the single item", () => {
      fake = new FakeArray(5);
      const result = fake.reduce((acc, currVal) => acc + currVal);
      assert.equal(result, 5);
    });

    it("should execute the callback function only once for an array with a single item and an initial value", () => {
      let callCount = 0;
      fake = new FakeArray(5);
      fake.reduce((acc, currVal) => {
        callCount++;
        return acc + currVal;
      }, 10);
      assert.equal(callCount, 1);
    });

    it("should provide the correct index and original array to the callback", () => {
      fake.reduce((acc, currVal, index, origArray) => {
        assert.deepEqual(origArray, new FakeArray(1, 2, 3, 4));
        assert.equal(index, currVal - 1);
        return acc + currVal;
      });
    });
  });
});
