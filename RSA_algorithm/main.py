#!/bin/env python3
# This is simple implementation of RSA algorithm

import random

# Global Variables
num=0;
primes = []
a=0
b=0
m=0
n=0
e=0
d=0
c=0
p=0
msg=0

# Check if n is prime number or not
def is_prime(n):
    for i in range(2,int(n**0.5)+1):
        if n%i==0:
            return False
    return True

# Generates prime number upto range
def gen_primes(rang):
    for possiblePrime in range(2, rang):
        
        # Assume number is prime until shown it is not. 
        isPrime = True
        for num in range(2, possiblePrime):
            if possiblePrime % num == 0:
                isPrime = False
          
        if isPrime:
            primes.append(possiblePrime)
    # print(primes)

# Greatest common divisor(HCF)
def gcd(a,b): 
    if(b==0): 
        return a 
    else: 
        return gcd(b,a%b) 

# Main rsa algorithm
def rsa():
    global a
    global b
    global m
    global n
    global e
    global d
    global c
    global p
    # p=int(s)
    p=int(msg)

    a=0
    b=0

    # Generate prime number upto given range and save to 'primes' arrary
    gen_primes(2000)

    # Generate Two Large Prime Numbers, a and b from arrary
    # a and b shouldn't be equal
    while(a==b):
        a=(random.choice(primes))
        b=(random.choice(primes))
        print("here")

    print("value of a is", a);
    print("value of b is", b,"\n");
    
    # Calculate m and n
    n=a*b
    m=(a-1)*(b-1)
    print("value of m is", m);
    print("value of n is", n,"\n");

    # N should be greater than p, else value of p is not accurate
    if n<p:
        # Start again if n<p
        print("<--- Value of n < p. Starting again --->\n")
        return rsa()

    # Choose a small number e (1 < e < m), coprime to m such that GCD(e, m) = 1.
    for i in range(2,m):
        gcdVal=gcd(i,m)
        print("gcd of",i,"and",m,"==>",gcdVal)
        if gcdVal==1:
            e=i
            break
    print("value of e is", e);

    # Find d, such that de % m = 1. Where d = (1 + m * i)/e
    # search until d is integer value
    for i in range(1,m):
        print("\nAt i =", i);
        d = (1 + m * i) / e
        print("value of d is", d);
        b = d / int(d)
        if b==1.0:
            break

    d=int(d)
    print("Required value of d is",d)

    # Calling for public_key function with encryption value 'e' and value of n to encrypt user message
    public_key(n,e)
    return

# Encryption Algorithm used by anyone with public key
# C = P^e % n
def public_key(x,y):
    print("\nEncryption");
    global c
    global p
    global n
    global e
    n = x
    e = y
    print("value of e is", e);
    print("value of n is", n);
    c = (p**e) % n
    print("value of c is", c);

    # Call decryption function with decryption value(d), 'n' and 'c'
    private_key(n,d,c)


# Decryption Algorithm used by owner of private key
# P = C^e % n
def private_key(x,y,z):
    print("\nDecryption");
    global p
    global n
    global e
    c=z
    n = x
    d = y
    print("value of c is", c);
    print("value of d is", d);
    print("value of n is", n);
    p = (c**d) % n

    print("Your input value was",msg,"and decrepted value is", p);
    

# Main function
def main():
    global msg
    msg = input("Enter your message (Represented by any integer value): ")
    rsa()
    # print(gen_prime.generate_prime_number())


if __name__ == '__main__':
    main()
