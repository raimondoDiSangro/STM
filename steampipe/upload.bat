@echo off
REM Upload the Windows build to Steam.
REM 1) Put the Steamworks SDK "tools\ContentBuilder\builder\steamcmd.exe" path below.
REM 2) Replace YOUR_STEAM_LOGIN with your Steamworks account name.
set STEAMCMD=C:\steamworks_sdk\tools\ContentBuilder\builder\steamcmd.exe
"%STEAMCMD%" +login YOUR_STEAM_LOGIN +run_app_build "%~dp0app_build.vdf" +quit
pause
