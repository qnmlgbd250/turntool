const headersBtn = document.getElementById('headersBtn');
const cookieBtn = document.getElementById('cookieBtn');
const rsaBtn = document.getElementById('rsaBtn');
const dataBtn = document.getElementById('dataBtn');
const transBtn = document.getElementById('transBtn');
const signBtn = document.getElementById('signBtn');
const input = document.getElementById('input');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const clearBtn = document.getElementById('clearBtn');

headersBtn.addEventListener('click', () => {
  const inputText = input.value;

  // 如果输入为空，将输出清空并返回
  if (!inputText.trim()) {
    output.value = '';
    return;
  }

  const headers = inputText.split('\n').reduce((acc, line) => {
    const [key, value] = line.split(':');
    if (key && value) {
      acc[key.trim()] = value.trim();
    }
    return acc;
  }, {});

  const outputText = JSON.stringify(headers, null, 2);
  output.value = outputText;
});

cookieBtn.addEventListener('click', () => {
const inputText = input.value;

// 如果输入为空，将输出清空并返回
  if (!inputText.trim()) {
    output.value = '';
    return;
  }

const cookies = inputText.split(';').reduce((acc, line) => {
  const [key, value] = line.split('=');
  if (key && value) {
    acc[key.trim()] = value.trim();
  }
  return acc;
}, {});

const outputText = JSON.stringify(cookies, null, 2);
output.value = outputText;
});

// RSA 解密
rsaBtn.addEventListener('click', () => {
        const privateKey = '-----BEGIN RSA PRIVATE KEY-----\n' +
          'MIICXQIBAAKBgQCnUM8ytq3umKWdiUYRNzo+e3HhfPbFkJ60twdvTudHxBLkssF0\n' +
          'TWfUpzlGTT/yCEwvnF9jdjq568dYWO4+1Sdk5bom4Mm0Q+xsv4vLL7Vby7DkipL0\n' +
          'cRAT9sJv9n5cuFVgCvkiqWHzDX7SK1n2CVEMybhlBNOfVptTYISCSN5udwIDAQAB\n' +
          'AoGAFGQJzGFtEx3xWSCotGJpq8G5oERtgqhcXyPLOSqBj0J7FvoeD4F7fPQgS8wQ\n' +
          'Vfvi5Q6GpYV8JLpyYfb8mhW6JiQvj4mUZQNLvPm54AgRG6+ZzlTquawdJc9io9OK\n' +
          '6B4TU7JEXn0vGKVz6ZqH4SYLUKHHSKSTaQRX1tM8zOBm5uECQQDe5vmd5urdpb5B\n' +
          'BHE1iiWzeHxTWebE7LLlnnN2k0uC6WjGnbAXFn2L7tP51/LMRbyKhBwOrVZJu20/\n' +
          'eUSvTr7nAkEAwCjcY61mqC7j6QKyFxt7TeyCihNfkhXrc2XYuUSZfqWBtoZPGqhZ\n' +
          '9Kz3WiJpW90KZwQARZrfMK5v6yTxV2mx8QJBAJB9BL24W/KFZ8hZitD71eh6Z4zY\n' +
          'L+Di1ixGA+6PGFmp14M34Fd2+rbkf3/q3bZQViEr9cwFzHNLDUwh3cYNs20CQBXJ\n' +
          'zEuFEtnJD1CRXK4gEJgiVB7h2XlQAPWBu9QuAhWJIK8YhYmpQyHqJtXShw3Cf3Z0\n' +
          'zq8Vw27aqJgKBU97DZECQQDedmYTpRp0SXb3oUlMXuLhypDNXOG6Sb1kROVCQzAu\n' +
          'lkT3KLOjoCv4zVvQJkRg1X8FgzP/qRESc797fQfRmYmI\n' +
          '-----END RSA PRIVATE KEY-----';
        const inputText = input.value;
        const rsa = new JSEncrypt();
        rsa.setPrivateKey(privateKey);
        output.value =  rsa.decrypt(inputText);

      });

// data获取
dataBtn.addEventListener('click', () => {
          const inputText = input.value.trim();
          const url = '/d/';
          fetch(url + inputText)
            .then(response => {
              if (response.ok) {
                return response.json(); // 将response对象转换为JSON格式
              } else {
                throw new Error('Network response was not ok.');
              }
            })
            .then(data => {
              console.log(data); // 输出JSON格式的数据
              output.value = JSON.stringify(JSON.parse(data.output), null, 2); // 将返回的数据放入output元素中
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        });

//翻译
transBtn.addEventListener('click', () => {
          const inputText = input.value.trim();
          const url = '/t/';
          fetch(url + inputText)
            .then(response => {
              if (response.ok) {
                return response.json(); // 将response对象转换为JSON格式
              } else {
                throw new Error('Network response was not ok.');
              }
            })
            .then(data => {
              console.log(data); // 输出JSON格式的数据
              output.value = data.output // 将返回的数据放入output元素中
            })
            .catch(error => {
              console.error('There was a problem with the fetch operation:', error);
            });
        });

//打卡时间换算
signBtn.addEventListener('click', () => {
        const inputText = input.value;

        // 如果输入为空，将输出清空并返回
        if (!inputText.trim()) {
          output.value = '';
          return;
        }
        const regex = /^(\d{1,2})[:：](\d{1,2})$/;
        const match = inputText.match(regex);

        if (!match) {
          output.value = '输入格式有误，请输入正确的时间格式（HH:MM）';
          return;
        }

        const input_time = inputText.replace(/[：:]/g, ":");
        // 将输入时间转换为分钟数
        let [HH, MM] = input_time.split(":").map(Number);
        let total_minutes = HH * 60 + MM;

        let offset_minutes = 5 * 60 + 15;
        let new_total_minutes = total_minutes + offset_minutes;
        let new_HH = Math.floor(new_total_minutes / 60);
        let new_MM = new_total_minutes % 60;
        let four_s = `4工时打卡时间为：${new_HH.toString().padStart(2, "0")}:${new_MM.toString().padStart(2, "0")}`;

        offset_minutes = 9 * 60 + 15;
        new_total_minutes = total_minutes + offset_minutes;
        new_HH = Math.floor(new_total_minutes / 60);
        new_MM = new_total_minutes % 60;
        output.value = four_s + `\n8工时打卡时间为：${new_HH.toString().padStart(2, "0")}:${new_MM.toString().padStart(2, "0")}`;




});

// 复制按钮点击事件
copyBtn.addEventListener('click', () => {
          // 如果输出框没有文本内容，弹出提示
          if (!output.value) {
            layer.msg('输出框为空，无法复制', {offset: [$(window).height() - 450], icon: 2, time: 1000});
            return;
          }
          // 选中输出框的文本内容
          output.select();
          // 执行复制命令
          document.execCommand('copy');
          // 弹出成功提示
          layer.msg('复制成功!',  {offset: [$(window).height() - 450], icon: 1, time: 1000});
        });

// 清除按钮点击事件
clearBtn.addEventListener('click', () => {
          input.value = '';
          output.value = '';
        });