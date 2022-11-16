
# Bash helpers
function quiet {
    $* > /dev/null 2>&1 
}

stepdo() { 
    echo "→ ${1}..."
}

# this will only capture the most recent return code, sadly.
stepdone(){
    statuscode=$?
    msg="... done"
    if [ $statuscode -ne 0 ]; then msg="❌  done, but non-zero return code ($statuscode)"; fi
    echo $msg
    echo " "
}
