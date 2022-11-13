import fs from 'fs';

export function backup(path, backupPath, callback) {

    fs.readFile(path, (err, fileContent) => {
        if (err) {
          console.error(err);
        } else {
          const data = JSON.parse(fileContent);

          if (data?.length) {
                const table = createTable(data);
                fs.writeFile(backupPath, table, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    callback(table)
                });
          } else {

          }
        }

    });
}

// export function exportFromBackup(backupFolder, fileName) {
//     const cutFromTag = (str, tag) => str.split(`<${tag}>`)[1].split(`</${tag}>`)[0]
//     fs.readFile(`${backupFolder}/${fileName}`, (err, fileContent) => {
//         const table = fileContent.toString();
//         const fields = cutFromTag(table, 'thead')
//     })
// }

function createTable(data) {
    const fields = Object.keys(data[0]);

    const createHead = (arr) => {
        return `<thead>
        ${arr.reduce((acc, cur) => {
            return acc + `<th>${cur}</th>`
        }, '')}
        </thead>`
    }

    const createRow = (elem) => {
        return `<tr>
        ${fields.reduce((acc, cur) => {
            return acc + `<td>${elem[cur]}</td>`
        }, '')}
        </tr>`
    }
    return `
        <table>
        ${createHead(fields)}
        ${data.reduce((acc, cur) => {
            return acc + createRow(cur)
        }, '')}
        </table>
    `
}