// Task 1

const iterateWithAsyncAwait = async (array) => {
  for (let element of array) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(element);
  }
};

// Task 3

async function awaitCall() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("HTTP error");
    }
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
}

// Task 4

async function concurrentReqs() {
  try {
    const [userData, postData] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1").then((res) =>
        res.json()
      ),
      fetch("https://jsonplaceholder.typicode.com/posts/1").then((res) =>
        res.json()
      ),
    ]);

    console.log(userData);
    console.log(postData);
  } catch (e) {
    console.error(e.message);
  }
}
