
var world = [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 0, 0, 1]
            ];

var clicPosition = {};
var currentBlock = {};



var fdown = function(e)
{
    if (e.target.className == "block")
    {
        clicPosition = {x: e.clientX, y: e.clientY};
        currentBlock = e.target;
        currentBlock.style.borderColor = "gray";
    }
};

var fup = function()
{
    currentBlock.style.borderColor = "black";
    clicPosition = {};
    currentBlock = {};
};

var fmove = function(e)
{
    if (currentBlock != {})
    {
        var xdiff = e.clientX - clicPosition.x;
        var ydiff = e.clientY - clicPosition.y;
        
        // if the mouse was moved at least 50 pixels towards a direction
        if (xdiff > 50 || xdiff < -50 || ydiff > 50 || ydiff < -50)
        {
            // block coordinates in the game world
            var i = currentBlock.offsetTop/50;
            var j = currentBlock.offsetLeft/50;
            var w = currentBlock.offsetWidth/50;
            var h = currentBlock.offsetHeight/50;
            
            if (xdiff > 50)
            {
                // if there are free cells where to move
                if (world[i][j+w] == 0 && world[i+h-1][j+w] == 0)
                {
                    currentBlock.style.left = (currentBlock.offsetLeft + 50) + "px";
                    
                    // update the game world
                    world[i][j] = 0;
                    world[i+h-1][j] = 0;
                    world[i][j+w] = 1;
                    world[i+h-1][j+w] = 1;
                    
                    clicPosition.x = e.clientX;
                }
            }
            else if (xdiff < -50)
            {
                if (world[i][j-1] == 0 && world[i+h-1][j-1] == 0)
                {
                    currentBlock.style.left = (currentBlock.offsetLeft - 50) + "px";
                    
                    world[i][j+w-1] = 0;
                    world[i+h-1][j+w-1] = 0;
                    world[i][j-1] = 1;
                    world[i+h-1][j-1] = 1;
                    
                    clicPosition.x = e.clientX;
                }
            }
            else if (ydiff > 50)
            {
                if (world[i+h][j] == 0 && world[i+h][j+w-1] == 0)
                {
                    currentBlock.style.top = (currentBlock.offsetTop + 50) + "px";
                    
                    world[i][j] = 0;
                    world[i][j+w-1] = 0;
                    world[i+h][j] = 1;
                    world[i+h][j+w-1] = 1;
                    
                    clicPosition.y = e.clientY;
                }
            }
            else if (ydiff < -50)
            {
                if (world[i-1][j] == 0 && world[i-1][j+w-1] == 0)
                {
                    currentBlock.style.top = (currentBlock.offsetTop - 50) + "px";
                    
                    world[i+h-1][j] = 0;
                    world[i+h-1][j+w-1] = 0;
                    world[i-1][j] = 1;
                    world[i-1][j+w-1] = 1;
                    
                    clicPosition.y = e.clientY;
                }
            }
        }
    }
};

var fout = function(e)
{
    // if we leave the game frame
    if (e.relatedTarget.parentNode != e.currentTarget && e.relatedTarget != e.currentTarget && (e.currentTarget == e.target || e.currentTarget == e.target.parentNode))
    {
        currentBlock.style.borderColor = "black";
        clicPosition = {};
        currentBlock = {};
    }
};

var freset = function()
{
    world = [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 0, 0, 1]
            ];

    clicPosition = {};
    currentBlock = {};
    
    document.getElementById("red1").style.top = "0px";
    document.getElementById("red1").style.left = "50px";
    document.getElementById("blue1").style.top = "0px";
    document.getElementById("blue1").style.left = "0px";
    document.getElementById("blue2").style.top = "0px";
    document.getElementById("blue2").style.left = "150px";
    document.getElementById("blue3").style.top = "100px";
    document.getElementById("blue3").style.left = "0px";
    document.getElementById("blue4").style.top = "100px";
    document.getElementById("blue4").style.left = "150px";
    document.getElementById("blue5").style.top = "100px";
    document.getElementById("blue5").style.left = "50px";
    document.getElementById("green1").style.top = "200px";
    document.getElementById("green1").style.left = "0px";
    document.getElementById("green2").style.top = "150px";
    document.getElementById("green2").style.left = "50px";
    document.getElementById("green3").style.top = "150px";
    document.getElementById("green3").style.left = "100px";
    document.getElementById("green4").style.top = "200px";
    document.getElementById("green4").style.left = "150px";
}


document.getElementById("frame").addEventListener("mouseout", fout);
document.getElementById("frame").addEventListener("mousedown", fdown);
document.getElementById("frame").addEventListener("mouseup", fup);
document.getElementById("frame").addEventListener("mousemove", fmove);
document.getElementById("button").addEventListener("mousedown", freset);

