var chai =require('chai');
var expect=chai.expect;
//hsc stands for httpStatusCode
var hsc=require('../dist');
describe("HTTP-STATUS-CODE FOR Number status codes",function(done){
        describe("100 series status code",function(done){
            it("100 is equal to Continue",function(done){
	       expect(hsc[100]).to.equal("Continue");
         	done();	
            });
	    it("101 is equal to Switching Protocols",function(done){
	    	expect(hsc[101]).to.equal("Switching Protocols");
		done();	
	    });
	    it("102 is equal to Processing",function(done){
		 expect(hsc[102]).to.equal("Processing");
		done();	
	    });
	   
        });
	describe("200 series status code",function(done){
            
	    it("200 is equal to Ok",function(done){
	       expect(hsc[200]).to.equal("Ok");
         	done();	
            });
	    it("201 is equal to Created",function(done){
	    	expect(hsc[201]).to.equal("Created");
		done();	
	    });

	    it("202 is equal to Accepted",function(done){
		 expect(hsc[202]).to.equal("Accepted");
		done();	
	    });
	    it("203 is equal to Non Authorative",function(done){
		 expect(hsc[203]).to.equal("Non Authorative");
		done();	
	    });
	    it("204 is equal to No Content",function(done){
		 expect(hsc[204]).to.equal("No Content");
		done();	
	    });
	    it("205 is equal to Reset Content",function(done){
		 expect(hsc[205]).to.equal("Reset Content");
		done();	
	    });
	    it("206 is equal to Partial Content",function(done){
		 expect(hsc[206]).to.equal("Partial Content");
		done();	
	    });
        });
	describe("300 series status code",function(done){
            
	    it("300 is equal to Multiple Choices",function(done){
	       expect(hsc[300]).to.equal("Multiple Choices");
         	done();	
            });
	    it("301 is equal to Moved Permanently",function(done){
	    	expect(hsc[301]).to.equal("Moved Permanently");
		done();	
	    });

	    it("302 is equal to Found",function(done){
		 expect(hsc[302]).to.equal("Found");
		done();	
	    });
	    it("303 is equal to Non See Other",function(done){
		 expect(hsc[303]).to.equal("See Other");
		done();	
	    });
	    it("304 is equal to Not Modified",function(done){
		 expect(hsc[304]).to.equal("Not Modified");
		done();	
	    });
	    it("305 is equal to Use Proxy",function(done){
		 expect(hsc[305]).to.equal("Use Proxy");
		done();	
	    });
	    it("306 is equal to Unused",function(done){
		 expect(hsc[306]).to.equal("Unused");
		done();	
	    });
	    it("307 is equal to Temporary Rediret",function(done){
		 expect(hsc[307]).to.equal("Temporary Redirect");
		done();	
	    });
	    it("308 is equal to Permanent Redirect",function(done){
		 expect(hsc[308]).to.equal("Permanent Redirect");
		done();	
	    });

        });
	describe("400 series status code",function(done){
            
	    it("400 is equal to Bad Request",function(done){
	       expect(hsc[400]).to.equal("Bad Request");
         	done();	
            });
	    it("401 is equal to Unauthorized",function(done){
	    	expect(hsc[401]).to.equal("Unauthorized");
		done();	
	    });

	    it("402 is equal to Payment Requried",function(done){
		 expect(hsc[402]).to.equal("Payment Required");
		done();	
	    });
	    it("403 is equal to Non Forbidden",function(done){
		 expect(hsc[403]).to.equal("Forbidden");
		done();	
	    });
	    it("404 is equal to Not Found",function(done){
		 expect(hsc[404]).to.equal("Not Found");
		done();	
	    });
	    it("405 is equal to Method Not Allowed",function(done){
		 expect(hsc[405]).to.equal("Method Not Allowed");
		done();	
	    });
	    it("406 is equal to Not Acceptable",function(done){
		 expect(hsc[406]).to.equal("Not Acceptable");
		done();	
	    });
	    it("407 is equal to Proxy Authentication Required",function(done){
		 expect(hsc[407]).to.equal("Proxy Authentication Required");
		done();	
	    });
	    it("408 is equal to Request Timeout",function(done){
		 expect(hsc[408]).to.equal("Request Timeout");
		done();	
	    });
	    it("409 is equal to Conflict",function(done){
	       expect(hsc[409]).to.equal("Conflict");
         	done();	
            });
	    it("410 is equal to Gone",function(done){
	    	expect(hsc[410]).to.equal("Gone");
		done();	
	    });
	    it("411 is equal to Length Required",function(done){
	    	expect(hsc[411]).to.equal("Length Required");
		done();	
	    });


	    it("412 is equal to Precondition Failed",function(done){
		 expect(hsc[412]).to.equal("Precondition Failed");
		done();	
	    });
	    it("413 is equal to Request Entity Too Large",function(done){
		 expect(hsc[413]).to.equal("Request Entity Too Large");
		done();	
	    });
	    it("414 is equal to Request-URI Too Long",function(done){
		 expect(hsc[414]).to.equal("Request-URI Too Long");
		done();	
	    });
	    it("415 is equal to Unsupported Media Type",function(done){
		 expect(hsc[415]).to.equal("Unsupported Media Type");
		done();	
	    });
	    it("416 is equal to Request Range Not Satisfiable",function(done){
		 expect(hsc[416]).to.equal("Requested Range Not Satisfiable");
		done();	
	    });
	    it("417 is equal to Exception Failed",function(done){
		 expect(hsc[417]).to.equal("Exception Failed");
		done();	
	    });
	    it("418 is equal to I'm teapot",function(done){
	       expect(hsc[418]).to.equal("I'm teapot");
         	done();	
            });
	    it("420 is equal to Enhance Your Calm",function(done){
		 expect(hsc[420]).to.equal("Enhance Your Calm");
		done();	
	    });
	    it("422 is equal to Unprocessable Entity",function(done){
		 expect(hsc[422]).to.equal("Unprocessable Entity");
		done();	
	    });
	    it("423 is equal to Locked",function(done){
		 expect(hsc[423]).to.equal("Locked");
		done();	
	    });
	    it("424 is equal to Failed Dependency",function(done){
		 expect(hsc[424]).to.equal("Failed Dependency");
		done();	

	    });
	    it("425 is equal to Reversed for WebDAV",function(done){
		 expect(hsc[425]).to.equal("Reserved for WebDAV");
		done();	
	    });
	    it("426 is equal to Upgrade Required",function(done){
		 expect(hsc[426]).to.equal("Upgrade Required");
		done();	
	    });
	    it("428 is equal to Precondition Required",function(done){
	       expect(hsc[428]).to.equal("Precondition Required");
         	done();	
            });
	    it("429 is equal to Too Many Requests",function(done){
	    	expect(hsc[429]).to.equal("Too Many Requests");
		done();	
	    });


        });
	describe("500 series status code",function(done){
            
	    it("500 is equal to Internal Server Error",function(done){
	       expect(hsc[500]).to.equal("Internal Server Error");
         	done();	
            });
	    it("501 is equal to Not Implemented",function(done){
	    	expect(hsc[501]).to.equal("Not Implemented");
		done();	
	    });

	    it("502 is equal to Bad Gateway",function(done){
		 expect(hsc[502]).to.equal("Bad Gateway");
		done();	
	    });
	    it("503 is equal to Service Unavailable",function(done){
		 expect(hsc[503]).to.equal("Service Unavailable");
		done();	
	    });
	    it("504 is equal to Gateway Timeout",function(done){
		 expect(hsc[504]).to.equal("Gateway Timeout");
		done();	
	    });
	    it("507 is equal to Insufficient Storage",function(done){
		 expect(hsc[507]).to.equal("Insufficient Storage");
		done();	
	    });
	    it("509 is equal to Bandwidth Limit Exceeded",function(done){
		 expect(hsc[509]).to.equal("Bandwidth Limit Exceeded");
		done();	
	    });
        });




});

