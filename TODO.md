- Create a bingo caller object to allow for variations in the caller voice over, timing, and commentary
- Let player set card and dabber colours
- Add ball CCTV view
- Add dab info into the bingohall and use it to render 
- Add 2, 3, 4 lines any way games
- Build game editor that generates patterns, masks, useless letters
- Add game programs; ability to group games into a playlist that plays from first game to last game
- Add other players in the bingo hall
	- Number of players in the hall is configurable between 0 - 100
	- Players are a random mixture of difficulty levels
- Other players difficulty settings controls how many cards they play 
	- Level: First Timer (1), Casual (3), Dedicated (5), Hardcore (10)
- Add internationalized caller text strings
- add more caller phrases
-add new callers



- Add reset logic to the caller to reset the timers and things when a game is reset
- Fix bug that prevents the card masks from updating when continuing to a next game.  This is probably fixable by adding player dab info into the bingohall object, then using it during render