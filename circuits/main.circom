pragma circom 2.0.0;

template SmallOddFactorization(level) {
    signal input product;
    signal input factor[level];

    signal temp[level+1];
    temp[0] <== 1;
    for (var i = 0; i < level; i++) {
        temp[i+1] <== temp[i] * factor[i];
    }

    temp[level] === product;
}

component main {public [product, factor]} = SmallOddFactorization(5);
