function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function startAnimation() {
    let p = document.getElementById("dims").value
        .split(",").map(x => parseInt(x.trim()));

    let n = p.length;
    let dp = Array.from({ length: n }, () => Array(n).fill(0));

    createIndexedTable(n);

    // Mark diagonal 0's
    for (let i = 0; i < n; i++) {
        const cell = document.getElementById(`cell-${i}-${i}`);
        cell.classList.add("diagonal");
    }

    // DP Animation
    for (let len = 2; len < n; len++) {
        for (let i = 1; i < n - len + 1; i++) {
            let j = i + len - 1;
            dp[i][j] = Infinity;

            let cell = document.getElementById(`cell-${i}-${j}`);
            cell.classList.add("highlight");

            await sleep(350);

            for (let k = i; k < j; k++) {
                let cost = dp[i][k] + dp[k+1][j] + p[i-1] * p[k] * p[j];
                dp[i][j] = Math.min(dp[i][j], cost);
            }

            cell.innerHTML = dp[i][j] +
                `<div class='small-index'>(${i},${j})</div>`;

            cell.classList.remove("highlight");
            cell.classList.add("anim-fill");

            await sleep(300);
        }
    }
}

function createIndexedTable(n) {
    const box = document.getElementById("tableBox");
    box.innerHTML = "";

    let html = "<table>";

    // Top index row (j)
    html += "<tr><th></th>";
    for (let j = 0; j < n; j++) {
        html += `<th class="index">j=${j}</th>`;
    }
    html += "</tr>";

    // DP grid with left index column (i)
    for (let i = 0; i < n; i++) {
        html += `<tr><th class="index">i=${i}</th>`;

        for (let j = 0; j < n; j++) {
            let val = (i === j) ? "0" : "";
            html += `
                <td id="cell-${i}-${j}">
                    ${val}
                    <div class="small-index">(${i},${j})</div>
                </td>`;
        }
        html += "</tr>";
    }

    html += "</table>";
    box.innerHTML = html;
}
