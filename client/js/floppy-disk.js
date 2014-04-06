var floppy = angular.module('floppy-disk', []);

/* The controller of main information such as the current directory tree and 
* contents of the current directory. */
floppy.controller('floppy-disk-controller', function($scope, $http, $window) {
    $scope.host = 'http://127.0.0.1:3000/';
    $scope.root = 'root';
    $scope.path = $scope.root;
   
    $scope.cwd = [];        // array of directory's parents
    $scope.directoy = [];   // array of item objects in the current directory
    
    /* opens a new window to download the file.
    * url: absolute internet url to download */
    $scope.download = function(url) {
        $window.open(url);
    };
    
    /* Navigates to corresponding file in the directory content array.
    * index: (i) -> $scope.directory[i], if index is undefined the current
        path is used to refresh the contents of the current directory */
    $scope.navigate = function(index) {
        
        // check if a valid index was given
        if (index !== undefined) {
            var item = $scope.directory[index];
            
            // if it points to a file download it
            if (item.type == 'file') {
                $scope.download($scope.host + $scope.path + '/' + item.name);
                return;
                
            // otherwise navigate to the next directory
            } else {
                // handle internal routing
                $scope.path += '/' + item.name;
            }
        }
        
        // update current working directory
        $scope.cwd = $scope.path.split('/');
        
        // get directory contents or start a download
        $http.get($scope.host + $scope.path).success(function(data) {
            // update directory information
            $scope.directory = data;
        });
    };
    
    /* Navigates the corresponding parent directory in the cwd array.
    * index: (i) -> $scope.cwd[i] */
    $scope.parent = function(index) {
        // consruct new path
        $scope.path = $scope.root;
        for (var i = 1; i <= index; i++)
            $scope.path += '/' + $scope.cwd[i];
            
        // navigates to current path
        $scope.navigate();
    };
    
    // initialization by navigation to root
    $scope.navigate();
});