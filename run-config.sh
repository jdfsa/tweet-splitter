#!/bin/bash -x

if test -z $1 ; then
    cp ./run-console.sh ./run.sh
else 
    cp ./run-server.sh ./run.sh
fi
