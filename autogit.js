const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const Schedule = require('node-schedule');
const newList = [];
const newversion = Math.random().toString(36).slice(-8);
const rule = new Schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

// 启动任务
let job = Schedule.scheduleJob(rule, () => {
    const handGIT = () => {
        exec('git add .', (err) => {
            if (!err) {
                exec(`git commit -m "update: version:${newversion}"`, (err) => {
                    exec('git push', (error) => {
                        if (error) {
                            console.log(error, '---git push err');
                        }
                    })
                })
            }
        });
    }

    fs.readFile(path.join(__dirname, './package.json'), 'utf8', (err, data) => {
        if (err) {
            console.log(err, '读取package失败');
        } else {
            let obj = JSON.parse(data);
            obj.version = newversion;
            obj = JSON.stringify(obj);
            fs.writeFile(path.resolve(__dirname, './package.json'), obj, 'utf8', (error, data) => {
                if (error) {
                    console.log(err, '修改package失败');
                } else {
                    handGIT();
                }
            });
        }
    })
});
