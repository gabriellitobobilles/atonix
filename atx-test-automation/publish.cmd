@ECHO OFF
SETLOCAL

SET USER=ppmd\rin94566

:MENU
ECHO.
ECHO ................................................
ECHO The User Is %USER%
ECHO Enter the password for publishing to dev
ECHO ................................................
ECHO.
set /P PASSWORD=Enter a Password:

"C:\Program Files\IIS\Microsoft Web Deploy V3\msdeploy" -verb:sync -source:contentPath='C:\_Current_Sprint2\Atonix.Web.Sites\dist\apps\workflow-editor' -dest:contentPath='Default Web Site/SII_WEB_TEST/WorkflowEditor',wmsvc=sii-ws-t01.ppmd.local,userName=%USER%,password=%PASSWORD%,AuthType='Basic' -allowUntrusted -enableRule=DoNotDeleteRule


