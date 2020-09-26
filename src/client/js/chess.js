// s1 = [x1, y1] , s2 = [x2, y2]
function move(s1, s2) {
    let square1 = document.getElementById(`${s1[0]}${s1[1]}`);
    let square2 = document.getElementById(`${s2[0]}${s2[1]}`);
    square2.innerHTML = square1.innerHTML;
    square1.innerHTML = "";
}