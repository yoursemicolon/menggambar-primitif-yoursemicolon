// untuk modularisasi, dipisah berdasarkan fungsi
function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // membuat titik
    var vertexShaderCode = `
    void main() {
        gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
        gl_PointSize = 10.0;
    }`

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // memberi warna
    var fragmentShaderCode = `
    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }`;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    // jadikan package berisi data-data
    var shaderProgram = gl.createProgram();

    // attach vertex dan fragment
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // link program
    gl.linkProgram(shaderProgram);

    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        var info = gl.getProgramInfoLog(shaderProgram);
        throw `Could not compile WebGL program. \n\n ${info}` // template literals
    }

    // use the program
    gl.useProgram(shaderProgram);

    // clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINT, 0, 1);
}
