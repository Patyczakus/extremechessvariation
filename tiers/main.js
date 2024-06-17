var blockResets = false

var boardL = [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
]
var boardNames = [
    ["A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
    ["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
    ["C0", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9"],
    ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9"],
    ["E0", "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9"],
    ["F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9"],
    ["G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9"],
    ["H0", "H1", "H2", "H3", "H4", "H5", "H6", "H7", "H8", "H9"],
    ["I0", "I1", "I2", "I3", "I4", "I5", "I6", "I7", "I8", "I9"],
    ["J0", "J1", "J2", "J3", "J4", "J5", "J6", "J7", "J8", "J9"],
]

const pieces = {
    "white-pawn": {
        imgSrc: "pieces/white/pawn.png",
        imgAlt: "white-pawn",
        classes: "piece white pawn",
    },
    "white-king": {
        imgSrc: "pieces/white/king.png",
        imgAlt: "white-king",
        classes: "piece white king",
    },
    "white-queen": {
        imgSrc: "pieces/white/queen.png",
        imgAlt: "white-queen",
        classes: "piece white queen",
    },
    "white-rook": {
        imgSrc: "pieces/white/rook.png",
        imgAlt: "white-rook",
        classes: "piece white rook",
    },
    "white-bishop": {
        imgSrc: "pieces/white/bishop.png",
        imgAlt: "white-bishop",
        classes: "piece white bishop",
    },
    "white-horse": {
        imgSrc: "pieces/white/horsey.png",
        imgAlt: "white-horsey",
        classes: "piece white horsey",
    },
    "black-normal": {
        imgSrc: "pieces/black/normal.png",
        imgAlt: "black-normal",
        classes: "piece black pawn",
    },
    "black-dama": {
        imgSrc: "pieces/black/dama.png",
        imgAlt: "black-lady",
        classes: "piece black dama",
    },
}
var colorMove = "white"
var blackTakeCords = {}
var sounds = {
    m: new Audio("sounds/Move.mp3"),
    p: new Audio("sounds/Promote.mp3"),
    t: new Audio("sounds/Take.mp3"),
    end: new Audio("sounds/Game Ended.mp3"),
}

window.onload = () => {
    generateBoard()
    addWhitePieces()
    addBlackPieces()
}

/**
 * Makes the board
 */
function generateBoard() {
    var board = document.createElement("table")
    board.id = "board"

    var move = document.createElement("td")
    move.id = "move"
    move.colSpan = boardL.length

    board.appendChild
    for (var i = 0; i < boardL.length; i++) {
        var row = document.createElement("tr")

        for (var j = 0; j < boardL[i].length; j++) {
            if (i + j == 0) {
                var move = document.createElement("td")
                move.id = "move"
                move.rowSpan = boardL[i].length

                row.appendChild(move)
            }

            var cell = document.createElement("td")
            cell.innerText = boardNames[i][j]
            cell.id = i.toString() + j.toString()
            cell.classList.add("square")
            cell.classList.add((i + j) % 2 == 0 ? "o" : "t")
            if (i % 9 === 0 || j % 9 === 0) cell.classList.add("red")
            row.appendChild(cell)
        }

        board.appendChild(row)
    }

    document.body.appendChild(board)

    var elements = document.querySelectorAll(`#board td.square`)
    elements.forEach((element) => {
        element.addEventListener("click", () => {
            if (element.classList.contains("there")) resetClasses()
            else if (element.classList.contains("move")) movePiece(element.id)
            else if (element.classList.contains("take")) takePiece(element.id)
            else if (element.classList.contains("taker")) takePiece(element.id)
            else paintMoves(element.getAttribute("id"))
        })
    })
}

/**
 * Add white pieces - *pawns*, *rooks*, *queen*, *horses*, *bishops* and *king*
 */
function addWhitePieces() {
    function addWhitePawns() {
        for (var i = 1; i < 9; i++) {
            var pawn = document.createElement("div")
            pawn.className = "piece white pawn"
            var img = document.createElement("img")
            img.src = "pieces/white/pawn.png"
            img.alt = "white-pawn"
            img.width = 50
            img.height = 50
            img.draggable = false
            pawn.appendChild(img)
            var cell = document.getElementById("2" + i)
            cell.appendChild(pawn)

            boardL[2][i] = "white-pawn"
        }
    }
    function addRooks() {
        for (var i = 0; i < 2; i++) {
            var piece = document.createElement("div")
            piece.className = "piece white rook"
            var img = document.createElement("img")
            img.src = "pieces/white/rook.png"
            img.alt = "white-rook"
            img.width = 50
            img.height = 50
            img.draggable = false
            piece.appendChild(img)
            var cell = document.getElementById("1" + (i * 7 + 1))
            cell.appendChild(piece)

            boardL[1][i * 7 + 1] = "white-rook"
        }
    }
    function addHorses() {
        for (var i = 0; i < 2; i++) {
            var piece = document.createElement("div")
            piece.className = "piece white horsey"
            var img = document.createElement("img")
            img.src = "pieces/white/horsey.png"
            img.alt = "white-horsey"
            img.width = 50
            img.height = 50
            img.draggable = false
            piece.appendChild(img)

            var cell = document.getElementById("1" + (i * 5 + 2))
            cell.appendChild(piece)

            boardL[1][i * 5 + 2] = "white-horse"
        }
    }
    function addBishops() {
        for (var i = 0; i < 2; i++) {
            var piece = document.createElement("div")
            piece.className = "piece white bishop"
            var img = document.createElement("img")
            img.src = "pieces/white/bishop.png"
            img.alt = "white-rook"
            img.width = 50
            img.height = 50
            img.draggable = false
            piece.appendChild(img)

            var cell = document.getElementById("1" + (i * 3 + 3))
            cell.appendChild(piece)

            boardL[1][i * 3 + 3] = "white-bishop"
        }
    }
    function addQueen() {
        var piece = document.createElement("div")
        piece.className = "piece white bishop"
        var img = document.createElement("img")
        img.src = "pieces/white/queen.png"
        img.alt = "white-queen"
        img.width = 50
        img.height = 50
        img.draggable = false
        piece.appendChild(img)

        var cell = document.getElementById("14")
        cell.appendChild(piece)

        boardL[1][4] = "white-queen"
    }
    function addKing() {
        var piece = document.createElement("div")
        piece.className = "piece white bishop"
        var img = document.createElement("img")
        img.src = "pieces/white/king.png"
        img.alt = "white-king"
        img.width = 50
        img.height = 50
        img.draggable = false
        piece.appendChild(img)

        var cell = document.getElementById("15")
        cell.appendChild(piece)

        boardL[1][5] = "white-king"
    }

    addWhitePawns()
    addRooks()
    addHorses()
    addBishops()
    addQueen()
    addKing()
}

/**
 * Adds the black pieces
 */
function addBlackPieces() {
    for (var i = 7; i < 10; i++) {
        for (var j = 0; j < 10; j++) {
            var piece = document.createElement("div")
            piece.className = `piece black normal`
            var img = document.createElement("img")
            img.src = `pieces/black/normal.png`
            img.alt = "black-normal"
            img.width = 50
            img.height = 50
            img.draggable = false
            piece.appendChild(img)
            var cell = document.getElementById(i.toString() + j.toString())
            cell.appendChild(piece)

            boardL[i][j] = "black-normal"
        }
    }
}
/**
 * This function gives a full list of legal moves. It isn't works at 100% + the king isn't have a possible checkmate/checks blocks
 *
 * @param {string} piece The piece id to check the legal moves. All possible ids can be found on JSON list `pieces`.
 * @param {number} row The number of rows (`board[`**`row`**`][col]`)
 * @param {number} col The number of columns (`board[row][`**`col`**`]`)
 * @param {(string | null)[][]} board The acctual board resource
 * @returns This returns a list `JSON[]`. `cor: number[]` give a coordinates possible to move, `tsTaking: boolean` says is it a take, and `takeCor: number[]` give the taking coordinates if piece is black
 */
function getLegalMoves(piece, row, col, board) {
    //console.log(row, col, piece)
    blackTakeCords = {}
    const legalMoves = []

    switch (piece) {
        case "white-pawn": {
            if (row === 2 && board[row + 1][col] == null) {
                legalMoves.push({ cor: [row + 1, col], isTaking: false })
                if (board[row + 2][col] === null) {
                    legalMoves.push({ cor: [row + 2, col], isTaking: false })
                }
            } else if (row < 9 && board[row + 1][col] == null) {
                legalMoves.push({ cor: [row + 1, col], isTaking: false })
            }
            if (col > 1 && row < 9 && board[row + 1][col - 1] !== null && board[row + 1][col - 1].startsWith("black")) {
                legalMoves.push({ cor: [row + 1, col - 1], isTaking: true })
            }
            if (col < 8 && row < 9 && board[row + 1][col + 1] !== null && board[row + 1][col + 1].startsWith("black")) {
                legalMoves.push({ cor: [row + 1, col + 1], isTaking: true })
            }
            break
        }
        case "white-horse": {
            let horseyMoves = [
                [2, 1],
                [2, -1],
                [-2, 1],
                [-2, -1],
                [1, 2],
                [1, -2],
                [-1, 2],
                [-1, -2],
            ]
            // iterate over all possible moves
            for (let move of horseyMoves) {
                let newRow = row + move[0]
                let newCol = col + move[1]
                // check if the move is inside the board
                if (newRow >= 1 && newRow < 9 && newCol >= 1 && newCol < 9) {
                    // check if the target field is empty or occupied by an enemy piece
                    if (board[newRow][newCol] == null || (board[newRow][newCol] != null && !board[newRow][newCol].startsWith("white"))) {
                        // add the move to the list of possible moves
                        legalMoves.push({
                            cor: [newRow, newCol],
                            isTaking: board[newRow][newCol] != null && board[newRow][newCol].startsWith("black"),
                        })
                    }
                }
            }
            break
        }
        case "white-bishop":
            for (let i = 1; row + i < 9 && col + i < 9; i++) {
                if (!board[row + i][col + i]) {
                    legalMoves.push({ cor: [row + i, col + i], isTaking: false })
                } else {
                    if (board[row + i][col + i].includes("black")) {
                        legalMoves.push({ cor: [row + i, col + i], isTaking: true })
                    }
                    break
                }
            }
            for (let i = 1; row - i >= 1 && col - i >= 1; i++) {
                if (!board[row - i][col - i]) {
                    legalMoves.push({ cor: [row - i, col - i], isTaking: false })
                } else {
                    if (board[row - i][col - i].includes("black")) {
                        legalMoves.push({ cor: [row - i, col - i], isTaking: true })
                    }
                    break
                }
            }
            for (let i = 1; row + i < 9 && col - i >= 1; i++) {
                if (!board[row + i][col - i]) {
                    legalMoves.push({ cor: [row + i, col - i], isTaking: false })
                } else {
                    if (board[row + i][col - i].includes("black")) {
                        legalMoves.push({ cor: [row + i, col - i], isTaking: true })
                    }
                    break
                }
            }
            for (let i = 1; row - i >= 1 && col + i < 9; i++) {
                if (!board[row - i][col + i]) {
                    legalMoves.push({ cor: [row - i, col + i], isTaking: false })
                } else {
                    if (board[row - i][col + i].includes("black")) {
                        legalMoves.push({ cor: [row - i, col + i], isTaking: true })
                    }
                    break
                }
            }
            break
        case "white-rook":
            for (let i = row - 1; i >= 1; i--) {
                if (board[i][col] === null) {
                    legalMoves.push({ cor: [i, col], isTaking: false })
                } else if (board[i][col].startsWith("black")) {
                    legalMoves.push({ cor: [i, col], isTaking: true })
                    break
                } else {
                    break
                }
            }

            for (let i = row + 1; i < 9; i++) {
                if (board[i][col] === null) {
                    legalMoves.push({ cor: [i, col], isTaking: false })
                } else if (board[i][col].startsWith("black")) {
                    legalMoves.push({ cor: [i, col], isTaking: true })
                    break
                } else {
                    break
                }
            }

            for (let j = col - 1; j >= 1; j--) {
                if (board[row][j] === null) {
                    legalMoves.push({ cor: [row, j], isTaking: false })
                } else if (board[row][j].startsWith("black")) {
                    legalMoves.push({ cor: [row, j], isTaking: true })
                    break
                } else {
                    break
                }
            }

            for (let j = col + 1; j < 9; j++) {
                if (board[row][j] === null) {
                    legalMoves.push({ cor: [row, j], isTaking: false })
                } else if (board[row][j].startsWith("black")) {
                    legalMoves.push({ cor: [row, j], isTaking: true })
                    break
                } else {
                    break
                }
            }
            break
        case "white-queen":
            for (let i = 1; row + i < 9 && col + i < 9; i++) {
                if (!board[row + i][col + i]) {
                    legalMoves.push({ cor: [row + i, col + i], isTaking: false })
                } else {
                    if (board[row + i][col + i].includes("black")) {
                        legalMoves.push({ cor: [row + i, col + i], isTaking: true })
                    }
                    break
                }
            }
            for (let i = 1; row - i >= 1 && col - i >= 1; i++) {
                if (!board[row - i][col - i]) {
                    legalMoves.push({ cor: [row - i, col - i], isTaking: false })
                } else {
                    if (board[row - i][col - i].includes("black")) {
                        legalMoves.push({ cor: [row - i, col - i], isTaking: true })
                    }
                    break
                }
            }
            for (let i = 1; row + i < 9 && col - i >= 1; i++) {
                if (!board[row + i][col - i]) {
                    legalMoves.push({ cor: [row + i, col - i], isTaking: false })
                } else {
                    if (board[row + i][col - i].includes("black")) {
                        legalMoves.push({ cor: [row + i, col - i], isTaking: true })
                    }
                    break
                }
            }
            for (let i = 1; row - i >= 1 && col + i < 9; i++) {
                if (!board[row - i][col + i]) {
                    legalMoves.push({ cor: [row - i, col + i], isTaking: false })
                } else {
                    if (board[row - i][col + i].includes("black")) {
                        legalMoves.push({ cor: [row - i, col + i], isTaking: true })
                    }
                    break
                }
            }

            for (let i = row - 1; i >= 1; i--) {
                if (board[i][col] === null) {
                    legalMoves.push({ cor: [i, col], isTaking: false })
                } else if (board[i][col].startsWith("black")) {
                    legalMoves.push({ cor: [i, col], isTaking: true })
                    break
                } else {
                    break
                }
            }
            for (let i = row + 1; i < 9; i++) {
                if (board[i][col] === null) {
                    legalMoves.push({ cor: [i, col], isTaking: false })
                } else if (board[i][col].startsWith("black")) {
                    legalMoves.push({ cor: [i, col], isTaking: true })
                    break
                } else {
                    break
                }
            }
            for (let j = col - 1; j >= 1; j--) {
                if (board[row][j] === null) {
                    legalMoves.push({ cor: [row, j], isTaking: false })
                } else if (board[row][j].startsWith("black")) {
                    legalMoves.push({ cor: [row, j], isTaking: true })
                    break
                } else {
                    break
                }
            }
            for (let j = col + 1; j < 9; j++) {
                if (board[row][j] === null) {
                    legalMoves.push({ cor: [row, j], isTaking: false })
                } else if (board[row][j].startsWith("black")) {
                    legalMoves.push({ cor: [row, j], isTaking: true })
                    break
                } else {
                    break
                }
            }
            break
        case "white-king": {
            const possibleMoves = [
                [row - 1, col - 1],
                [row - 1, col],
                [row - 1, col + 1],
                [row, col - 1],
                [row, col + 1],
                [row + 1, col - 1],
                [row + 1, col],
                [row + 1, col + 1],
            ]

            // Check each possible move
            for (const [r, c] of possibleMoves) {
                // Check if move is inside board
                if (r >= 1 && r < 9 && c >= 1 && c < 9) {
                    const destPiece = board[r][c]
                    const isTaking = destPiece != null && destPiece.startsWith("black")

                    // King can move to empty square or capture opponent's piece
                    if (destPiece === null || isTaking) {
                        legalMoves.push({ cor: [r, c], isTaking: isTaking })
                    }
                }
            }
            break
        }
        case "black-dama":
        case "black-normal": {
            // walking
            if (row - 1 >= 1 && col + 1 <= 8 && board[row - 1][col + 1] == null) {
                legalMoves.push({ cor: [row - 1, col + 1], isTaking: false })
            }
            if (row - 1 >= 1 && col - 1 >= 1 && board[row - 1][col - 1] == null) {
                legalMoves.push({ cor: [row - 1, col - 1], isTaking: false })
            }

            // check jump moves
            if (row - 2 >= 0 && col - 2 >= 0 && board[row - 1][col - 1] != null && board[row - 1][col - 1].startsWith("white") && board[row - 2][col - 2] == null) {
                legalMoves.push({ cor: [row - 2, col - 2], isTaking: true, takeCor: [row - 1, col - 1] })
                blackTakeCords[`${row - 2}${col - 2}`] = [row - 1, col - 1]
            }
            if (row - 2 >= 0 && col + 2 < 10 && board[row - 1][col + 1] != null && board[row - 1][col + 1].startsWith("white") && board[row - 2][col + 2] == null) {
                legalMoves.push({ cor: [row - 2, col + 2], isTaking: true, takeCor: [row - 1, col + 1] })
                blackTakeCords[`${row - 2}${col + 2}`] = [row - 1, col + 1]
            }

            if (piece === "black-dama") {
                // walking back
                if (row + 1 <= 8 && col + 1 <= 8 && board[row + 1][col + 1] == null) {
                    legalMoves.push({ cor: [row + 1, col + 1], isTaking: false })
                }
                if (row + 1 <= 8 && col - 1 >= 1 && board[row + 1][col - 1] == null) {
                    legalMoves.push({ cor: [row + 1, col - 1], isTaking: false })
                }

                // check jump moves
                if (row + 2 < 10 && col - 2 >= 0 && board[row + 1][col - 1] != null && board[row + 1][col - 1].startsWith("white") && board[row + 2][col - 2] == null) {
                    legalMoves.push({ cor: [row + 2, col - 2], isTaking: true, takeCor: [row + 1, col - 1] })
                    blackTakeCords[`${row + 2}${col - 2}`] = [row + 1, col - 1]
                }
                if (row + 2 < 10 && col + 2 < 10 && board[row + 1][col + 1] != null && board[row + 1][col + 1].startsWith("white") && board[row + 2][col + 2] == null) {
                    legalMoves.push({ cor: [row + 2, col + 2], isTaking: true, takeCor: [row + 1, col + 1] })
                    blackTakeCords[`${row + 2}${col + 2}`] = [row + 1, col + 1]
                }
            }
            break
        }
        default:
            console.error("Invalid piece type")
    }

    return legalMoves
}

/**
 * This function resets the all squares' class - `.there`, `.move`, `.take` and `.taker`.
 * - `.there` - attachment point of piece
 * - `.move` - all legal move
 * - `.take` - all legal takes
 * - `.taker` - if the piece is white for black attacker, is highlighted by this class
 */
function resetClasses() {
    if (blockResets) return
    for (var i = 0; i < boardL.length ** 2; i++) {
        if (document.querySelectorAll("td.square")[i].classList.contains("there")) document.querySelectorAll("td.square")[i].classList.remove("there")
        if (document.querySelectorAll("td.square")[i].classList.contains("move")) document.querySelectorAll("td.square")[i].classList.remove("move")
        if (document.querySelectorAll("td.square")[i].classList.contains("take")) document.querySelectorAll("td.square")[i].classList.remove("take")
        if (document.querySelectorAll("td.square")[i].classList.contains("taker")) document.querySelectorAll("td.square")[i].classList.remove("taker")
    }
}

/**
 * This function make visual moves for piece searched from parameter `cellID` with 4 classes - `.there`, `.move`, `.take` and `.taker`.
 * - `.there` - attachment point of piece
 * - `.move` - all legal move
 * - `.take` - all legal takes
 * - `.taker` - if the piece is white for black attacker, is highlighted by this class
 * @param {string} cellID Coordinates (or `.square` id) to get the attachment point
 * @param {boolean} [blacksys=false] Boolean to change painting system
 */
function paintMoves(cellID = String(), blacksys = false) {
    var cords = [Number(cellID[0]), Number(cellID[1])]

    resetClasses()

    if (boardL[cords[0]][cords[1]] != null) {
        if (!boardL[cords[0]][cords[1]].startsWith(colorMove)) return

        var lgm = getLegalMoves(blacksys ? "black-dama" : boardL[cords[0]][cords[1]], cords[0], cords[1], boardL)
        document.querySelector(`#board td.square[id="${cords.join("")}"]`).classList.add("there")
        //console.log(lgm, boardL[cords[0]][cords[1]], cords)
        for (let i = 0; i < lgm.length; i++) {
            let movement = lgm[i]

            if (movement.isTaking) {
                document.querySelector(`#board td.square[id="${movement.cor.join("")}"]`).classList.add("take")
                if (typeof movement.takeCor != "undefined") document.querySelector(`#board td.square[id="${movement.takeCor.join("")}"]`).classList.add("taker")
            } else if (!blacksys) document.querySelector(`#board td.square[id="${movement.cor.join("")}"]`).classList.add("move")
        }
    }
}

/**
 * This function make pieces moving. White pawns and black normal pieces can be promote then.
 * @param {string} newCords Coordinates where the vertical is to be found via an element with the class `.there`
 */
function movePiece(newCords) {
    var oldCords = document.querySelector("td.square.there").id
    oldCords = [Number(oldCords[0]), Number(oldCords[1])]
    var piece = boardL[oldCords[0]][oldCords[1]]
    newCords = [Number(newCords[0]), Number(newCords[1])]
    boardL[newCords[0]][newCords[1]] = piece
    boardL[oldCords[0]][oldCords[1]] = null

    if (piece == "black-normal" && newCords[0] <= 1) {
        boardL[newCords[0]][newCords[1]] = "black-dama"
        sounds.p.currentTime = 0
        sounds.p.play()
    } else if (piece == "white-pawn" && newCords[0] == 8) {
        boardL[newCords[0]][newCords[1]] = "white-bishop"
        sounds.p.currentTime = 0
        sounds.p.play()
    }
    setTimeout(() => {
        sounds.m.currentTime = 0
        sounds.m.play()
    }, 75)

    colorMove = colorMove == "white" ? "black" : "white"
    regenerateBoard()
}

/**
 * This function make taking opposite color's piece. White pawns and black normal pieces can be promote then.
 * @param {string} newCords Coordinates where the vertical is to be found via an element with the class `.there`
 */
function takePiece(newCords) {
    var oldCords = document.querySelector("td.square.there").id
    oldCords = [Number(oldCords[0]), Number(oldCords[1])]
    var piece = boardL[oldCords[0]][oldCords[1]]
    if (piece.startsWith("black") && typeof blackTakeCords[newCords] != "undefined") boardL[blackTakeCords[newCords][0]][blackTakeCords[newCords][1]] = null
    newCords = [Number(newCords[0]), Number(newCords[1])]
    boardL[newCords[0]][newCords[1]] = piece
    boardL[oldCords[0]][oldCords[1]] = null

    const $fastdata = getLegalMoves("black-dama", newCords[0], newCords[1], boardL).find((x) => x.isTaking)

    if (piece == "black-normal" && newCords[0] <= 1) {
        boardL[newCords[0]][newCords[1]] = "black-dama"
        sounds.p.currentTime = 0
        sounds.p.play()
    }
    if (piece == "white-pawn" && newCords[0] == 8) {
        boardL[newCords[0]][newCords[1]] = "white-bishop"
        sounds.p.currentTime = 0
        sounds.p.play()
    }
    setTimeout(() => {
        sounds.t.currentTime = 0
        sounds.t.play()
    }, 75)

    if (colorMove === "black" && newCords[0] > 1 && $fastdata) {
        blockResets = true
        regenerateBoard()
        paintMoves(newCords.join(""), true)
    } else {
        blockResets = false
        colorMove = colorMove == "white" ? "black" : "white"
        regenerateBoard()
    }
}

/**
 * This function regenerates board from var `boardL`
 */
function regenerateBoard() {
    var board = document.querySelector("table#board")
    board.innerHTML = ""
    for (var i = 0; i < boardL.length; i++) {
        var row = document.createElement("tr")

        for (var j = 0; j < boardL[i].length; j++) {
            if (i + j == 0) {
                var move = document.createElement("td")
                move.id = "move"
                move.rowSpan = boardL.length
                move.style.background = `var(--${colorMove}Color)`

                row.appendChild(move)
            }

            var cell = document.createElement("td")
            cell.innerText = boardNames[i][j]
            cell.id = i.toString() + j.toString()
            cell.classList.add("square")
            cell.classList.add((i + j) % 2 == 0 ? "o" : "t")
            if (i % 9 === 0 || j % 9 === 0) cell.classList.add("red")

            if (boardL[i][j] != null) {
                var piece = document.createElement("div")
                piece.className = pieces[boardL[i][j]].classes
                var img = document.createElement("img")
                img.src = pieces[boardL[i][j]].imgSrc
                img.alt = pieces[boardL[i][j]].imgAlt
                img.width = 50
                img.height = 50
                img.draggable = false
                piece.appendChild(img)
                cell.appendChild(piece)
            }

            row.appendChild(cell)
        }

        board.appendChild(row)
    }

    checkEndGame()

    var elements = document.querySelectorAll(`#board td.square`)
    elements.forEach((element) => {
        element.addEventListener("click", () => {
            if (element.classList.contains("there")) resetClasses()
            else if (element.classList.contains("move")) movePiece(element.id)
            else if (element.classList.contains("take")) takePiece(element.id)
            else paintMoves(element.getAttribute("id"))
        })
    })
}

/**
 * This function checks the end of the game.
 * Possible ending:
 * - black wins after taking white's king
 * - white wins if there any black piece in the board
 */
function checkEndGame() {
    var end = document.createElement("div")
    end.id = "endgame"
    var whiteKingHere = false
    var blackPiecesLeft = 0

    for (let i = 0; i < boardL.length; i++) {
        for (let j = 0; j < boardL[i].length; j++) {
            if (boardL[i][j] == "white-king") {
                whiteKingHere = true
                break
            }
        }
        if (whiteKingHere) break
    }
    for (let i = 0; i < boardL.length; i++) {
        for (let j = 0; j < boardL[i].length; j++) {
            if (boardL[i][j] != null && boardL[i][j].startsWith("black")) {
                blackPiecesLeft++
            }
        }
    }

    if (whiteKingHere && blackPiecesLeft > 0) return

    //console.log(whiteKingHere)
    if (whiteKingHere == false) {
        end.style.background = `var(--blackColor)`
        end.style.color = `white`
        end.innerText = "Czarne wygrały!"
    }
    //console.log(blackPiecesLeft)
    if (blackPiecesLeft == 0) {
        end.style.background = `var(--whiteColor)`
        end.style.color = `black`
        end.innerText = "Białe wygrały!"
    }
    end.innerHTML += `<br /><button style="font-size: 50%" onclick="location.reload()">Jeszcze raz!</button>`
    document.body.innerHTML = ""
    document.body.appendChild(end)
    setTimeout(() => {
        sounds.end.play()
    }, 50)
}
