<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit80dc5cabe46e25bb2a3b557614c658bd
{
    public static $prefixLengthsPsr4 = array (
        'H' => 
        array (
            'HrxApi\\' => 7,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'HrxApi\\' => 
        array (
            0 => __DIR__ . '/..' . '/hrx/api-lib/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit80dc5cabe46e25bb2a3b557614c658bd::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit80dc5cabe46e25bb2a3b557614c658bd::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit80dc5cabe46e25bb2a3b557614c658bd::$classMap;

        }, null, ClassLoader::class);
    }
}
