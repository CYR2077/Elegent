login();
function login(){
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const raw = JSON.stringify({
    "ServerID": 1
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };
  fetch("http://localhost:8080/login", requestOptions)
    .then(response => response.json())
    // .then(result => sgsLogin(result.account, result.password))
    .then(result => sgsLogin("13730819886", "c5121428"))
    .catch(error => console.error(error));
}

const { Builder, By, Key, until } = require('selenium-webdriver');
async function sgsLogin(account, password) {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get("https://web.sanguosha.com/login/index.html");
    // await driver.manage().window().maximize();
    await driver.findElement(By.id("SGS_login-account")).sendKeys(account);
    await driver.findElement(By.id("SGS_login-password")).sendKeys(password);
    await driver.findElement(By.id("SGS_userProto")).click();
    await driver.findElement(By.id("SGS_login-btn")).click();
    await driver.wait(until.elementsLocated(By.className('game-item')), 2000);
    await driver.findElement(By.className("game-item")).click();
    await driver.findElement(By.id("goInGameBtn")).click();
  } catch (error) {
    console.error(error);
  } finally {
    // await driver.quit();
  }
};