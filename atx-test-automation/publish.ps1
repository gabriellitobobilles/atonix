# MSDEPLOY from PowerShell
param($localPath = "workflow-editor",$site="SII_WEB_DEV");
$remotePath = "Default Web Site/$site/WorkflowEditor"; 

Write-Host("...........................................")
$username = "ppmd\$env:USERNAME"
Write-Host ("Username: $username")
Write-Host("Input nothing to keep username.");
$newUsername = Read-Host -Prompt "New Username"
If ($newUsername -ne "" -and $newUsername -ne [String]::Empty){
  $username = $newUsername
}
Write-Host("Using username: $username")
Write-Host("...........................................")

$password = Read-Host -Prompt "Password for Publish" -AsSecureString

Write-Host("...........................................")

$BSTR = `
    [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password)
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

$destParam = "-dest:contentPath='$remotePath',wmsvc=sii-ws-t01.ppmd.local,userName=$username,password=$plainPassword,AuthType='basic'"

$myPath = Resolve-Path .
$myPath = "$myPath\dist\apps\$localPath"

Write-Host("Publishing contents of $myPath to $remotePath")

$msdeploy = "msdeploy"
$msdeployArgs = @(
"-verb:sync",
"-source:contentPath='$myPath'",
$destParam,
"-allowUntrusted",
"-enableRule=DoNotDeleteRule"
)

Write-Host ("Publishing $localPath to $site");
Start-Process $msdeploy -NoNewWindow -ArgumentList $msdeployArgs -Wait
Write-Host ("Publishing Complete");
