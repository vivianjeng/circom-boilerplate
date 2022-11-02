pragma circom 2.0.0;

template SmallOddFactorization(level) {
    signal input product;
    signal input factor[level];

    signal temp1 <== factor[0]*factor[1];
    signal temp2;
    for (var i = 2; i < level; i++) {
        temp2 <== temp1 * factor[i];
    }

    temp2 === product;
}

component main {public [product, factor]} = SmallOddFactorization(3);
