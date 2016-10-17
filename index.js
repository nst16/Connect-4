//this is the js for connect 4
//variables
var onePlayer = false;
var twoPlayer = false;

var playerOneTurn = true;
var playerTwoTurn = false;

var gameFinished = true;
var difficulty = "Easy";

//loop through rows/columns to add eventlisteners
for (var i = 1; i < 43; i++)
{
	var j = document.getElementById(i);
	j.addEventListener("click", addToken);
}

var startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

var message = document.getElementById("message");

var selectElt = document.getElementById("gameType");
selectElt.addEventListener("change", showDifficulty);

var difficultyElt = document.getElementById("difficulty");

//functions
function showDifficulty()
{
	if(selectElt.value == "1 Player")
	{
		difficultyElt.style.visibility = "initial";
	}
	else
	{
		difficultyElt.style.visibility = "hidden";
	}
}

function startGame()
{
	//clear board
	for (var i = 1; i < 43; i++)
	{
		var j = document.getElementById(i);
		j.style.backgroundColor = "white";
		j.style.color = "white";
	}

	//make it player one's turn
	playerOneTurn = true;

	if(document.getElementById("gameType").value == "1 Player")
	{
		onePlayer = true;
		difficulty = difficultyElt.value;
	}
	else
	{
		twoPlayer = true;
	}
	gameFinished = false;
	this.innerHTML = "New game";
	message.innerHTML = "Who will win this time?";
}

function addToken()
{
	if(gameFinished)
	{
		return;
	}
	var changeSpace = 0;
	if (playerOneTurn)
	{
		playerOneTurn = false;
		var mod = this.id%7;
		for(var i = 1; i < 43; i++)
		{
			if (i%7 == mod)
			{
				var potentSpace = document.getElementById(i);
				if(potentSpace.style.backgroundColor != "black" && potentSpace.style.backgroundColor != "red")
				{
					changeSpace = i;
				}
			}
		}

		document.getElementById(changeSpace).style.backgroundColor = "red";
		document.getElementById(changeSpace).style.color = "red";
		if(checkScore(changeSpace, "red"))
		{
			message.innerHTML = "Red" + " team wins!";
			gameFinished = true;
		}

		//if it is a 1 player game now the computer takes a turn
		if(onePlayer)
		{
			if(!gameFinished)
			{
				setTimeout(computerTurn, 1500);
			}
		}
	}
	else
	{
		playerOneTurn = true;
		var mod = this.id%7;
		for(var i = 1; i < 43; i++)
		{
			if (i%7 == mod)
			{
				var potentSpace = document.getElementById(i);
				if(potentSpace.style.backgroundColor != "black" && potentSpace.style.backgroundColor != "red")
				{
					changeSpace = i;
				}
			}
		}

		document.getElementById(changeSpace).style.backgroundColor = "black";
		document.getElementById(changeSpace).style.color = "black";
		if(checkScore(changeSpace, "black"))
		{
			message.innerHTML = "Black" + " team wins!";
			gameFinished = true;
		}
	}
}

function checkScore(changeSpace, color)
{
	var mod = changeSpace % 7;
	if (mod == 0)
	{
		mod = 7;
	}
	var win = false;
	//check diagonals
	var sum = 1;
	diagonals = [-8,-6,6,8];
	//add top left to bottom right to see if 4 in a row is attained
	if(mod > 1)
	{
		if(document.getElementById(changeSpace+diagonals[0]))
		{
			if(document.getElementById(changeSpace+diagonals[0]).style.backgroundColor == color)
			{
				sum++;
				if(document.getElementById(changeSpace+2*diagonals[0]) && (mod > 2))
				{
					if(document.getElementById(changeSpace+2*diagonals[0]).style.backgroundColor == color)
					{
						sum++;
						if(document.getElementById(changeSpace+3*diagonals[0]) && (mod > 3))
						{
							if(document.getElementById(changeSpace+3*diagonals[0]).style.backgroundColor == color)
							{
								sum++;
							}
						}
					}
				}
			}
		}
	}
	if(mod < 7)
	{
		if(document.getElementById(changeSpace+diagonals[3]))
		{
			if(document.getElementById(changeSpace+diagonals[3]).style.backgroundColor == color)
			{
				sum++;
				if(document.getElementById(changeSpace+2*diagonals[3]) && (mod < 6))
				{
					if(document.getElementById(changeSpace+2*diagonals[3]).style.backgroundColor == color)
					{
						sum++;
						if(document.getElementById(changeSpace+3*diagonals[3]) && (mod < 5))
						{
							if(document.getElementById(changeSpace+3*diagonals[3]).style.backgroundColor == color)
							{
								sum++;
							}
						}
					}
				}
			}
		}
	}
	if(sum >= 4)
	{
		win = true;
		return win;
	}

	//now check top right to bottom left
	sum = 1;
	if(mod < 7)
	{
		if(document.getElementById(changeSpace+diagonals[1]))
		{
			if(document.getElementById(changeSpace+diagonals[1]).style.backgroundColor == color)
			{
				sum++;
				if(document.getElementById(changeSpace+2*diagonals[1]) && (mod < 6))
				{
					if(document.getElementById(changeSpace+2*diagonals[1]).style.backgroundColor == color)
					{
						sum++;
						if(document.getElementById(changeSpace+3*diagonals[1]) && (mod < 5))
						{
							if(document.getElementById(changeSpace+3*diagonals[1]).style.backgroundColor == color)
							{
								sum++;
							}
						}
					}
				}
			}
		}
	}
	if(mod > 1)
	{
		if(document.getElementById(changeSpace+diagonals[2]))
		{
			if(document.getElementById(changeSpace+diagonals[2]).style.backgroundColor == color)
			{
				sum++;
				if(document.getElementById(changeSpace+2*diagonals[2]) && (mod > 2))
				{
					if(document.getElementById(changeSpace+2*diagonals[2]).style.backgroundColor == color)
					{
						sum++;
						if(document.getElementById(changeSpace+3*diagonals[2]) && (mod > 3))
						{
							if(document.getElementById(changeSpace+3*diagonals[2]).style.backgroundColor == color)
							{
								sum++;
							}
						}
					}
				}
			}
		}
	}
	if(sum >= 4)
	{
		win = true;
		return win;
	}

	//check below vertically away from changed space
	var mod = changeSpace % 7;
	var i = changeSpace  + 7;
	{
		if((i) % 7 == mod)
		{
			if(document.getElementById(i))
			{
				if(document.getElementById(i).style.backgroundColor == color)
				{
					if(document.getElementById(i+7))
					{
						if(document.getElementById(i+7).style.backgroundColor == color)
						{
							if(document.getElementById(i+14))
							{
								if(document.getElementById(i+14).style.backgroundColor == color)
								{
									win = true;
									return win;
								}
							}
						}
					}
				}
			}
		}
	}

	//check horizontal from changed space
	sum = 1;
	var count = 1;
	if(mod == 0)
	{
		mod = 7;
	}
	while(document.getElementById(changeSpace-count) && ((mod - count) > 0))
	{
		if(document.getElementById(changeSpace-count).style.backgroundColor == color)
		{
			sum++;
		}
		else
		{
			break;
		}
		count++;
	}
	count = 1;
	if(mod == 7)
	{
		mod = 0;
	}
	while(document.getElementById(changeSpace+count) && ((mod + count) <= 7) && (mod != 0))
	{
		if(document.getElementById(changeSpace+count).style.backgroundColor == color)
		{
			sum++;
		}
		else
		{
			break;
		}
		count++;
	}
	if(sum >= 4)
	{
		win = true;
		return win;
	}

	return win;
}

function computerTurn()
{
	if(difficulty == "Easy")
	{
		var token = Math.random();
		token = Math.floor(token * 41) + 1;
		while(document.getElementById(token).style.backgroundColor != "white")
		{
			token = Math.random();
			token = Math.floor(token * 42);
		}
		document.getElementById(token).click();
	}

	else if(difficulty == "Hard")
	{
		var compWin = false;
		for(var i = 1; i < 43; i++)
		{
			if(document.getElementById(i).style.backgroundColor != "red" && document.getElementById(i).style.backgroundColor != "black")
			{
				if(document.getElementById(i+7))
				{
					if(document.getElementById(i+7).style.backgroundColor != "white")
					{
						document.getElementById(i).style.backgroundColor = "black";
						document.getElementById(i).style.color = "black";
						//then check if it won the game
						//if so click it black instead
						if(checkScore(i,"black"))
						{
							//computer just won
							document.getElementById(i).style.backgroundColor = "white";
							document.getElementById(i).style.color = "white";
							document.getElementById(i).click();
							compWin = true;
							break;
						}
						else
						{
							//change it back to white if not clicked
							document.getElementById(i).style.backgroundColor = "white";
							document.getElementById(i).style.color = "white";
						}
					}
				}
				else
				{
					document.getElementById(i).style.backgroundColor = "black";
					document.getElementById(i).style.color = "black";
					//then check if it won the game
					//if so click it black instead
					if(checkScore(i,"black"))
					{
						//computer just won
						document.getElementById(i).style.backgroundColor = "white";
						document.getElementById(i).style.color = "white";
						document.getElementById(i).click();
						compWin = true;
						break;
					}
					else
					{
						//change it back to white if not clicked
						document.getElementById(i).style.backgroundColor = "white";
						document.getElementById(i).style.color = "white";
					}
				}
			}
		}

		if(!compWin)
		{
			var blocked = false;
			for(var i = 1; i < 43; i++)
			{
				//make the space red
				if(document.getElementById(i).style.backgroundColor != "red" && document.getElementById(i).style.backgroundColor != "black")
				{
					if(document.getElementById(i+7))
					{
						if(document.getElementById(i+7).style.backgroundColor != "white")
						{
							document.getElementById(i).style.backgroundColor = "red";
							document.getElementById(i).style.color = "red";
							//then check if it won the game
							//if so click it black instead
							if(checkScore(i,"red"))
							{
								document.getElementById(i).style.backgroundColor = "black";
								document.getElementById(i).style.color = "black";
								//make it player's turn again
								playerOneTurn = true;
								blocked = true;
								break;
							}
							else
							{
								//change it back to white if not clicked
								document.getElementById(i).style.backgroundColor = "white";
								document.getElementById(i).style.color = "white";
							}
						}
					}
					else
					{
						document.getElementById(i).style.backgroundColor = "red";
						document.getElementById(i).style.color = "red";
						//then check if it won the game
						//if so click it black instead
						if(checkScore(i,"red"))
						{
							document.getElementById(i).style.backgroundColor = "black";
							document.getElementById(i).style.color = "black";
							//make it player's turn again
							playerOneTurn = true;
							blocked = true;
							break;
						}
						else
						{
							//change it back to white if not clicked
							document.getElementById(i).style.backgroundColor = "white";
							document.getElementById(i).style.color = "white";
						}
					}
				}
			}
		}
		//select winning move select space otherwise
		if(!blocked)
		{	
			if(!compWin)
			{
				var token = Math.random();
				token = Math.floor(token * 41) + 1;
				while(document.getElementById(token).style.backgroundColor != "white")
				{
					token = Math.random();
					token = Math.floor(token * 41) + 1;
				}
				document.getElementById(token).click();
			}
		}	
	}
}