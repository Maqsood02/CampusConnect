@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------

@IF "%DEBUG%" == "" @ECHO OFF
@REM set %ENABLE_DELAYED_EXPANSION% to on if needed
@setlocal EnableExtensions EnableDelayedExpansion

@REM Execute a user defined script if available
if exist "%USERPROFILE%\.mavenrc_pre.cmd" call "%USERPROFILE%\.mavenrc_pre.cmd"

set ERROR_CODE=0

@REM To isolate internal variables from possible conflicting external, expose only MAVEN_PROJECT_BASEDIR
set MAVEN_PROJECT_BASEDIR=%~dp0
if "%MAVEN_PROJECT_BASEDIR:~-1%"=="\" set "MAVEN_PROJECT_BASEDIR=%MAVEN_PROJECT_BASEDIR:~0,-1%"

set "WRAPPER_JAR=%MAVEN_PROJECT_BASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain"

@REM Download wrapper jar if not present
if not exist "%WRAPPER_JAR%" (
    echo Downloading Maven Wrapper...
    powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object Net.WebClient).DownloadFile('https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar', '%WRAPPER_JAR%')"
)

if "%JAVA_HOME%"=="" (
    if exist "C:\Program Files\Java\jdk-26.0.1" (
        set "JAVA_HOME=C:\Program Files\Java\jdk-26.0.1"
    ) else if exist "C:\Program Files\Java\latest" (
        set "JAVA_HOME=C:\Program Files\Java\latest"
    )
)

if "%JAVA_HOME%"=="" (
    set "JAVA_EXE=java.exe"
) else (
    set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
)

"%JAVA_EXE%" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECT_BASEDIR%" -classpath "%WRAPPER_JAR%" %WRAPPER_LAUNCHER% %*
if ERRORLEVEL 1 goto error
goto end

:error
set ERROR_CODE=1

:end
@endlocal & set ERROR_CODE=%ERROR_CODE%
exit /B %ERROR_CODE%
